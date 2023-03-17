import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import plantsReducer from './plantsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    plants: plantsReducer
  }
})

// using TypeScript inference to figure out as much possible without declaring it myself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>