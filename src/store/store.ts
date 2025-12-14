import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '@/store/slices/tasksSlice'
import conditionsReducer from '@/store/slices/conditionsSlice'
import actionReducer from '@/store/slices/actionSlice'
import selectionReducer from '@/store/slices/selectionSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    conditions: conditionsReducer,
    action: actionReducer,
    selection: selectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
