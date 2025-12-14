import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Condition, Group } from '@/components/task/task-item'
import { sampleItem } from '@/data/data'
import type { TypeRuleUnit } from '@/types/client'
import { deleteTask } from './tasksSlice'

type ConditionPayloadUpdate =
  | Partial<NonNullable<TypeRuleUnit['payload']['valueBased']>>
  | Partial<NonNullable<TypeRuleUnit['payload']['metricBased']>>

interface ConditionsState {
  byTaskId: Record<string, Array<Condition>>
}

const createInitialConditions = (): Array<Condition> => [
  {
    id: 'root-group',
    type: 'group',
    relation: 'and',
    children: [sampleItem],
  },
]

const initialState: ConditionsState = {
  byTaskId: {
    'task-1': createInitialConditions(),
  },
}

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    addCondition: (state, action: PayloadAction<string>) => {
      const taskId = action.payload

      // Lazy initialization - create conditions if they don't exist
      if (!state.byTaskId[taskId]) {
        state.byTaskId[taskId] = createInitialConditions()
      }

      const conditions = state.byTaskId[taskId]

      const rootGroup = conditions[0]
      if (rootGroup && rootGroup.type === 'group') {
        rootGroup.children.push({ ...sampleItem, id: String(Date.now()) })
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
            id: String(Date.now()),
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

            // Initialize the payload for the new rule type if it doesn't exist
            const newPayload = { ...item.payload }
            if (newRuleType === 'metricBased' && !newPayload.metricBased) {
              // Initialize with default metric-based values
              newPayload.metricBased = {
                metric: item.payload.valueBased?.metric || 'cost',
                range: item.payload.valueBased?.range || 'last_30_days',
                operator: item.payload.valueBased?.operator || 'eq',
                comparisonMetricWeight: 0,
                comparisonMetric: 'cost',
                comparisonMetricRange: 'last_30_days',
              }
            } else if (newRuleType === 'valueBased' && !newPayload.valueBased) {
              // Initialize with default value-based values
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
              result.push({
                ...item,
                children: ungroupById(item.children),
              })
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
            id: String(Date.now() + Math.random()),
            payload: {
              ...condition.payload,
              [condition.ruleType]: { ...condition.payload[condition.ruleType] },
            },
          }
        } else {
          return {
            id: String(Date.now() + Math.random()),
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
            // Found the item to duplicate - push both original and duplicate
            result.push(item)
            const duplicate = cloneCondition(item)
            result.push(duplicate)
          } else if (item.type === 'group') {
            // Process groups that might contain the item to duplicate
            result.push({
              ...item,
              type: 'group',
              relation: item.relation,
              children: duplicateById(item.children),
            })
          } else {
            // Regular items - just push as-is
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
      }

      state.byTaskId[action.payload.taskId] = deleteById(conditions)
    },

    updateRelation: (
      state,
      action: PayloadAction<{ taskId: string; groupId: string; relation: 'and' | 'or' }>
    ) => {
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
    // Clean up conditions when a task is deleted
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

// Selectors
export const selectTaskConditions = (state: { conditions: ConditionsState }, taskId: string) => {
  // Return existing conditions or initial conditions for new tasks
  return state.conditions.byTaskId[taskId] || createInitialConditions()
}

export default conditionsSlice.reducer
