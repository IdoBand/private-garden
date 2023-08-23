import { configureStore } from '@reduxjs/toolkit'
import plantsReducer from './plantsSlice'
import windowReducer from './windowSlice'
import postsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    plants: plantsReducer,
    window: windowReducer,
    posts: postsReducer,
  }
})

// using TypeScript inference to figure out as much possible without declaring it myself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>