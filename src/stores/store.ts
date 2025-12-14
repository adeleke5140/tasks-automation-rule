import { configureStore } from '@reduxjs/toolkit'
import conditionsReducer from '@/store/slices/conditionsSlice'
import selectionReducer from '@/store/slices/selectionSlice'
import actionReducer from '@/store/slices/actionSlice'

export const store = configureStore({
  reducer: {
    conditions: conditionsReducer,
    selection: selectionReducer,
    action: actionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
