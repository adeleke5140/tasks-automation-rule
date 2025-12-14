import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TypeTask } from '@/types/client'

type Action = TypeTask['action']
type ObjectType = TypeTask['objectType']

interface ActionState {
  selectedAction: Action
  objectType: ObjectType
}

const initialState: ActionState = {
  selectedAction: 'pause',
  objectType: 'adset',
}

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setSelectedAction: (state, action: PayloadAction<Action>) => {
      state.selectedAction = action.payload
    },
    setObjectType: (state, action: PayloadAction<ObjectType>) => {
      state.objectType = action.payload
    },
  },
})

export const { setSelectedAction, setObjectType } = actionSlice.actions

export const selectAction = (state: { action: ActionState }) => state.action.selectedAction
export const selectObjectType = (state: { action: ActionState }) => state.action.objectType

export const getObjectTypeDisplay = (objectType: ObjectType): string => {
  const map: Record<ObjectType, string> = {
    campaign: 'Campaigns',
    adset: 'Adsets',
    ad: 'Ads',
  }
  return map[objectType] || objectType
}

export default actionSlice.reducer
