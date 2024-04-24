import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducer/gameReducer'

export const store = configureStore({
  reducer: {
    gameReducer
  },
})