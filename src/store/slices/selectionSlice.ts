import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SelectionState {
  selectedIds: string[]
}

const initialState: SelectionState = {
  selectedIds: [],
}

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedIds.indexOf(action.payload)
      if (index !== -1) {
        state.selectedIds.splice(index, 1)
      } else {
        state.selectedIds.push(action.payload)
      }
    },

    clearSelection: (state) => {
      state.selectedIds = []
    },

    selectMultiple: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload
    },

    removeFromSelection: (state, action: PayloadAction<string>) => {
      state.selectedIds = state.selectedIds.filter((id) => id !== action.payload)
    },
  },
})

export const { toggleSelection, clearSelection, selectMultiple, removeFromSelection } = selectionSlice.actions

export const isIdSelected = (state: { selection: SelectionState }, id: string): boolean => {
  return state.selection.selectedIds.includes(id)
}

export default selectionSlice.reducer
