import { createSlice } from '@reduxjs/toolkit'
import { newId } from '@/utils/id'

interface TasksState {
  allIds: string[]
}

export const INITIAL_TASK_ID = newId('task')

const initialState: TasksState = {
  allIds: [INITIAL_TASK_ID],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state) => {
      state.allIds.push(newId('task'))
    },

    deleteTask: (state, action) => {
      state.allIds = state.allIds.filter((id) => id !== action.payload)
    },
  },
})

export const { addTask, deleteTask } = tasksSlice.actions

export const selectAllTaskIds = (state: { tasks: TasksState }) => state.tasks.allIds

export default tasksSlice.reducer
