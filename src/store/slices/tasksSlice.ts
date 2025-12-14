import { createSlice } from '@reduxjs/toolkit'

interface TasksState {
  allIds: string[]
}

const initialState: TasksState = {
  allIds: ['task-1'],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state) => {
      const newId = `task-${Date.now()}`
      state.allIds.push(newId)
    },

    deleteTask: (state, action) => {
      state.allIds = state.allIds.filter((id) => id !== action.payload)
    },
  },
})

export const { addTask, deleteTask } = tasksSlice.actions

export const selectAllTaskIds = (state: { tasks: TasksState }) => state.tasks.allIds

export default tasksSlice.reducer
