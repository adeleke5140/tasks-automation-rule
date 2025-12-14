import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TypeTask } from '@/types/client'
import { deleteTask } from './tasksSlice'

type Action = TypeTask['action']
type ObjectType = TypeTask['objectType']

interface TaskActionState {
  action: Action
  objectType: ObjectType
}

interface ActionState {
  byTaskId: Record<string, TaskActionState>
}

const createInitialAction = (): TaskActionState => ({
  action: 'pause',
  objectType: 'adset',
})

const initialState: ActionState = {
  byTaskId: {
    'task-1': createInitialAction(),
  },
}

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setSelectedAction: (state, action: PayloadAction<{ taskId: string; action: Action }>) => {
      if (!state.byTaskId[action.payload.taskId]) {
        state.byTaskId[action.payload.taskId] = createInitialAction()
      }
      state.byTaskId[action.payload.taskId].action = action.payload.action
    },
    setObjectType: (state, action: PayloadAction<{ taskId: string; objectType: ObjectType }>) => {
      if (!state.byTaskId[action.payload.taskId]) {
        state.byTaskId[action.payload.taskId] = createInitialAction()
      }
      state.byTaskId[action.payload.taskId].objectType = action.payload.objectType
    },
  },
  extraReducers: (builder) => {
    // Clean up action when a task is deleted
    builder.addCase(deleteTask, (state, action) => {
      delete state.byTaskId[action.payload]
    })
  },
})

export const { setSelectedAction, setObjectType } = actionSlice.actions

// Selectors
export const selectTaskAction = (state: { action: ActionState }, taskId: string) =>
  state.action.byTaskId[taskId]?.action

export const selectTaskObjectType = (state: { action: ActionState }, taskId: string) =>
  state.action.byTaskId[taskId]?.objectType

export const getObjectTypeDisplay = (objectType: ObjectType): string => {
  const map: Record<ObjectType, string> = {
    campaign: 'Campaigns',
    adset: 'Adsets',
    ad: 'Ads',
  }
  return map[objectType] || objectType
}

export default actionSlice.reducer
