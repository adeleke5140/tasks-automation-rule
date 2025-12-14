import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { deleteTask } from './tasksSlice'

interface SelectionState {
  byTaskId: Record<string, string[]>
}

const initialState: SelectionState = {
  byTaskId: {
    'task-1': [],
  },
}

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<{ taskId: string; conditionId: string }>) => {
      if (!state.byTaskId[action.payload.taskId]) {
        state.byTaskId[action.payload.taskId] = []
      }

      const selectedIds = state.byTaskId[action.payload.taskId]
      const index = selectedIds.indexOf(action.payload.conditionId)

      if (index >= 0) {
        selectedIds.splice(index, 1)
      } else {
        selectedIds.push(action.payload.conditionId)
      }
    },

    clearSelection: (state, action: PayloadAction<string>) => {
      if (state.byTaskId[action.payload]) {
        state.byTaskId[action.payload] = []
      }
    },
  },
  extraReducers: (builder) => {
    // Clean up selection when a task is deleted
    builder.addCase(deleteTask, (state, action) => {
      delete state.byTaskId[action.payload]
    })
  },
})

export const { toggleSelection, clearSelection } = selectionSlice.actions

// Selectors
export const selectTaskSelectedIds = (state: { selection: SelectionState }, taskId: string) =>
  state.selection.byTaskId[taskId] || []

export const isIdSelected = (state: { selection: SelectionState }, taskId: string, conditionId: string) =>
  state.selection.byTaskId[taskId]?.includes(conditionId) || false

export default selectionSlice.reducer
