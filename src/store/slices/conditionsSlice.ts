import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Condition, Group } from '../../components/task-item'
import { sampleGroup, sampleItem } from '../../data/data'

interface ConditionsState {
  conditions: Array<Condition>
}

const initialState: ConditionsState = {
  conditions: [sampleGroup],
}

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    addCondition: (state) => {
      const existingGroup = state.conditions.find((item) => item.type === 'group')
      if (!existingGroup) {
        state.conditions.push({ ...sampleItem, id: String(Date.now()) })
        return
      }
      const updatedGroup = {
        ...existingGroup,
        children: [...existingGroup.children, { ...sampleItem, id: String(Date.now()) }]
      }
      state.conditions = [updatedGroup]
    },

    deleteCondition: (state, action: PayloadAction<string>) => {
      const deleteFromArray = (items: Array<Condition>): Array<Condition> => {
        const result: Array<Condition> = []

        items.forEach(item => {
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

    createNestedGroup: (state, action: PayloadAction<Set<string>>) => {
      const selectedIds = action.payload
      if (selectedIds.size < 2) {
        return
      }

      const findAndGroup = (items: Array<Condition>): Array<Condition> => {
        const selected: Array<Condition> = []
        const remaining: Array<Condition> = []

        items.forEach(item => {
          if (item.type === 'condition' && selectedIds.has(item.id)) {
            selected.push(item)
          } else if (item.type === 'group') {
            const updatedGroup = {
              ...item,
              children: findAndGroup(item.children),
            }
            remaining.push(updatedGroup)
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
          return [...remaining, newGroup]
        }

        return items
      }

      state.conditions = findAndGroup(state.conditions)
    },

    changeRuleType: (state, action: PayloadAction<{ id: string; ruleType: 'valueBased' | 'metricBased' }>) => {
      const updateRuleType = (items: Array<Condition>): Array<Condition> => {
        return items.map(item => {
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
  },
})

export const {
  addCondition,
  deleteCondition,
  createGroup,
  createNestedGroup,
  changeRuleType,
} = conditionsSlice.actions

export default conditionsSlice.reducer