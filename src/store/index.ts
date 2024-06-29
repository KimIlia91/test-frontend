import { configureStore } from '@reduxjs/toolkit'
import partnersTableReducer from './partner/partner-slice'

export const store = configureStore({
  reducer: {
    partnersTable: partnersTableReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch