import { createSlice, type PayloadAction, current } from '@reduxjs/toolkit'
import type { Condition, Group } from '@/components/task/task-item'
import { sampleItem } from '@/data/data'
import type { TypeRuleUnit } from '@/types/client'

type ConditionPayloadUpdate =
  | Partial<NonNullable<TypeRuleUnit['payload']['valueBased']>>
  | Partial<NonNullable<TypeRuleUnit['payload']['metricBased']>>

interface ConditionsState {
  conditions: Array<Condition>
}

const initialState: ConditionsState = {
  conditions: [
    {
      id: 'root-group',
      type: 'group',
      relation: 'and',
      children: [sampleItem],
    },
  ],
}

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    addCondition: (state) => {
      const rootGroup = state.conditions[0]
      if (rootGroup && rootGroup.type === 'group') {
        rootGroup.children.push({ ...sampleItem, id: String(Date.now()) })
      }
    },

    deleteCondition: (state, action: PayloadAction<string>) => {
      const deleteFromArray = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          if (item.id === action.payload) {
            return
          }

          if (item.type === 'group') {
            const updatedChildren = deleteFromArray(item.children)

            if (updatedChildren.length === 0) {
              return
            } else if (updatedChildren.length === 1) {
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

      const newConditions = deleteFromArray(state.conditions)
      if (newConditions.length > 0) {
        state.conditions = newConditions
      }
    },

    createGroup: (state) => {
      if (state.conditions.length <= 1) {
        return
      }
      const newGroup: Group = {
        id: String(Date.now()),
        type: 'group',
        relation: 'or',
        children: state.conditions,
      }
      state.conditions = [newGroup]
    },

    createNestedGroup: (state, action: PayloadAction<Array<string>>) => {
      const selectedIds = new Set(action.payload)
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

      const result = findAndGroup(state.conditions)
      state.conditions = result.items
    },

    changeRuleType: (state, action: PayloadAction<{ id: string; ruleType: 'valueBased' | 'metricBased' }>) => {
      const updateRuleType = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'condition' && item.id === action.payload.id) {
            return {
              ...item,
              ruleType: action.payload.ruleType,
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

      state.conditions = updateRuleType(state.conditions)
    },

    ungroupGroup: (state, action: PayloadAction<string>) => {
      const ungroupById = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          if (item.type === 'group') {
            if (item.id === action.payload) {
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

      state.conditions = ungroupById(state.conditions)
    },

    duplicateGroup: (state, action: PayloadAction<string>) => {
      const duplicateById = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach((item) => {
          result.push(item)

          if (item.id === action.payload) {
            const duplicate = JSON.parse(JSON.stringify(current(item))) as Condition
            const assignNewIds = (obj: Condition): void => {
              obj.id = String(Date.now() + Math.random())
              if (obj.type === 'group') {
                obj.children.forEach(assignNewIds)
              }
            }
            assignNewIds(duplicate)
            result.push(duplicate)
          } else if (item.type === 'group') {
            result[result.length - 1] = {
              ...item,
              children: duplicateById(item.children),
            }
          }
        })

        return result
      }

      state.conditions = duplicateById(state.conditions)
    },

    deleteGroup: (state, action: PayloadAction<string>) => {
      const deleteById = (items: Array<Condition>): Array<Condition> => {
        return items
          .filter((item) => item.id !== action.payload)
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

      state.conditions = deleteById(state.conditions)
    },

    updateRelation: (state, action: PayloadAction<{ id: string; relation: 'and' | 'or' }>) => {
      const updateById = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'group') {
            if (item.id === action.payload.id) {
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

      state.conditions = updateById(state.conditions)
    },

    updateConditionPayload: (state, action: PayloadAction<{ id: string; payload: ConditionPayloadUpdate }>) => {
      const updateById = (items: Array<Condition>): Array<Condition> => {
        return items.map((item) => {
          if (item.type === 'condition' && item.id === action.payload.id) {
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

      state.conditions = updateById(state.conditions)
    },
  },
})

export const {
  addCondition,
  deleteCondition,
  createGroup,
  createNestedGroup,
  changeRuleType,
  ungroupGroup,
  duplicateGroup,
  deleteGroup,
  updateRelation,
  updateConditionPayload,
} = conditionsSlice.actions

export default conditionsSlice.reducer
