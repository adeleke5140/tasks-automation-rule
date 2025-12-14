import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { newId } from '@/utils/id'
import type { Condition, Group } from '@/components/task/types'
import { sampleItem } from '@/data/data'
import type { TypeRuleUnit } from '@/types/client'
import { deleteTask, INITIAL_TASK_ID } from './tasksSlice'

type ConditionPayloadUpdate =
  | Partial<NonNullable<TypeRuleUnit['payload']['valueBased']>>
  | Partial<NonNullable<TypeRuleUnit['payload']['metricBased']>>

interface ConditionsState {
  byTaskId: Record<string, Array<Condition>>
}

const createInitialConditions = (): Array<Condition> => [
  {
    id: newId('root'),
    type: 'group',
    relation: 'and',
    children: [{ ...sampleItem, id: newId('condition') }],
  },
]

const initialState: ConditionsState = {
  byTaskId: {
    [INITIAL_TASK_ID]: createInitialConditions(),
  },
}

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    addCondition: (state, action: PayloadAction<string>) => {
      const taskId = action.payload

      if (!state.byTaskId[taskId]) {
        state.byTaskId[taskId] = createInitialConditions()
      }

      const conditions = state.byTaskId[taskId]

      const rootGroup = conditions[0]
      if (rootGroup && rootGroup.type === 'group') {
        rootGroup.children.push({ ...sampleItem, id: newId('condition') })
      }
    },

    deleteCondition: (state, action: PayloadAction<{ taskId: string; conditionId: string }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const deleteFromArray = (items: Array<Condition>, isRoot = false): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          if (item.id === action.payload.conditionId) {
            return
          }

          if (item.type === 'group') {
            const updatedChildren = deleteFromArray(item.children, false)

            if (updatedChildren.length === 0) {
              return
            } else if (updatedChildren.length === 1 && !isRoot) {
              result.push(updatedChildren[0])
            } else {
              result.push({
                ...item,
                children: updatedChildren,
              })
            }
          } else {
            result.push(item)
          }
        })

        return result
      }

      const newConditions = deleteFromArray(conditions, true)
      if (newConditions.length > 0) {
        state.byTaskId[action.payload.taskId] = newConditions
      }
    },

    createNestedGroup: (state, action: PayloadAction<{ taskId: string; selectedIds: string[] }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const selectedIds = new Set(action.payload.selectedIds)
      if (selectedIds.size < 2) {
        return
      }

      const findAndGroup = (items: Array<Condition>): { items: Array<Condition>; grouped: boolean } => {
        const selected: Array<Condition> = []
        const remaining: Array<Condition> = []
        let hasGrouped = false

        items.forEach((item) => {
          if (item.type === 'condition' && selectedIds.has(item.id)) {
            selected.push(item)
          } else if (item.type === 'group') {
            const result = findAndGroup(item.children)
            if (result.grouped) {
              hasGrouped = true
              remaining.push({
                ...item,
                children: result.items,
              })
            } else {
              remaining.push(item)
            }
          } else {
            remaining.push(item)
          }
        })

        if (selected.length >= 2) {
          const newGroup: Group = {
            id: newId('group'),
            type: 'group',
            relation: 'or',
            children: selected,
          }
          return { items: [...remaining, newGroup], grouped: true }
        }

        if (hasGrouped) {
          return { items: [...selected, ...remaining], grouped: true }
        }

        return { items, grouped: false }
      }

      const result = findAndGroup(conditions)
      state.byTaskId[action.payload.taskId] = result.items
    },

    changeRuleType: (
      state,
      action: PayloadAction<{ taskId: string; conditionId: string; ruleType: 'valueBased' | 'metricBased' }>
    ) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const updateRuleType = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'condition' && item.id === action.payload.conditionId) {
            const newRuleType = action.payload.ruleType

            const newPayload: TypeRuleUnit['payload'] = {}

            if (newRuleType === 'metricBased') {
              newPayload.metricBased = {
                metric: item.payload.valueBased?.metric || 'cost',
                range: item.payload.valueBased?.range || 'last_30_days',
                operator: item.payload.valueBased?.operator || 'eq',
                comparisonMetricWeight: 0,
                comparisonMetric: 'cost',
                comparisonMetricRange: 'last_30_days',
              }
            } else if (newRuleType === 'valueBased') {
              newPayload.valueBased = {
                metric: item.payload.metricBased?.metric || 'cost',
                range: item.payload.metricBased?.range || 'today',
                operator: item.payload.metricBased?.operator || 'lt',
                value: 0,
              }
            }

            return {
              ...item,
              ruleType: newRuleType,
              payload: newPayload,
            }
          } else if (item.type === 'group') {
            return {
              ...item,
              children: updateRuleType(item.children),
            }
          }
          return item
        })
      }

      state.byTaskId[action.payload.taskId] = updateRuleType(conditions)
    },

    ungroupGroup: (state, action: PayloadAction<{ taskId: string; groupId: string }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const ungroupById = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          if (item.type === 'group') {
            if (item.id === action.payload.groupId) {
              result.push(...item.children)
            } else {
              const updatedGroup = {
                ...item,
                children: ungroupById(item.children),
              }
              if (updatedGroup.children.length > 0) {
                result.push(updatedGroup)
              }
            }
          } else {
            result.push(item)
          }
        })

        return result
      }

      state.byTaskId[action.payload.taskId] = ungroupById(conditions)
    },

    duplicateGroup: (state, action: PayloadAction<{ taskId: string; groupId: string }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const cloneCondition = (condition: Condition): Condition => {
        if (condition.type === 'condition') {
          return {
            ...condition,
            id: newId('condition'),
            payload: {
              ...condition.payload,
              [condition.ruleType]: { ...condition.payload[condition.ruleType] },
            },
          }
        } else {
          return {
            id: newId('group'),
            type: 'group' as const,
            relation: condition.relation,
            children: condition.children.map(cloneCondition),
          }
        }
      }

      const duplicateById = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          if (item.id === action.payload.groupId) {
            result.push(item)
            const duplicate = cloneCondition(item)
            result.push(duplicate)
          } else if (item.type === 'group') {
            result.push({
              ...item,
              type: 'group',
              relation: item.relation,
              children: duplicateById(item.children),
            })
          } else {
            result.push(item)
          }
        })

        return result
      }

      state.byTaskId[action.payload.taskId] = duplicateById(conditions)
    },

    deleteGroup: (state, action: PayloadAction<{ taskId: string; groupId: string }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const deleteById = (items: Array<Condition>): Array<Condition> => {
        return items
          .filter((item) => item.id !== action.payload.groupId)
          .map((item) => {
            if (item.type === 'group') {
              return {
                ...item,
                children: deleteById(item.children),
              }
            }
            return item
          })
          .filter((item) => {
            if (item.type === 'group') {
              return item.children.length > 0
            }
            return true
          })
      }

      state.byTaskId[action.payload.taskId] = deleteById(conditions)
    },

    updateRelation: (state, action: PayloadAction<{ taskId: string; groupId: string; relation: 'and' | 'or' }>) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const updateById = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'group') {
            if (item.id === action.payload.groupId) {
              return {
                ...item,
                relation: action.payload.relation,
              }
            }
            return {
              ...item,
              children: updateById(item.children),
            }
          }
          return item
        })
      }

      state.byTaskId[action.payload.taskId] = updateById(conditions)
    },

    updateConditionPayload: (
      state,
      action: PayloadAction<{ taskId: string; conditionId: string; payload: ConditionPayloadUpdate }>
    ) => {
      const conditions = state.byTaskId[action.payload.taskId]
      if (!conditions) return

      const updateById = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'condition' && item.id === action.payload.conditionId) {
            return {
              ...item,
              payload: {
                ...item.payload,
                [item.ruleType]: {
                  ...item.payload[item.ruleType],
                  ...action.payload.payload,
                },
              },
            }
          } else if (item.type === 'group') {
            return {
              ...item,
              children: updateById(item.children),
            }
          }
          return item
        })
      }

      state.byTaskId[action.payload.taskId] = updateById(conditions)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTask, (state, action) => {
      delete state.byTaskId[action.payload]
    })
  },
})

export const {
  addCondition,
  deleteCondition,
  createNestedGroup,
  changeRuleType,
  ungroupGroup,
  duplicateGroup,
  deleteGroup,
  updateRelation,
  updateConditionPayload,
} = conditionsSlice.actions

export const selectTaskConditions = (state: { conditions: ConditionsState }, taskId: string) => {
  return state.conditions.byTaskId[taskId] || createInitialConditions()
}

export default conditionsSlice.reducer
