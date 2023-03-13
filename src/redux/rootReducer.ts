import { combineReducers } from 'redux'
import { appReducer } from './appReducer'

export const rootReducer = combineReducers({
  appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
