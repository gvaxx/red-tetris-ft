import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'

const initialState = {
  socket: '',
  errors: {
    playerName: '',
    roomName: '',
  },
  game: {
    playerName: '',
    roomName: '',
    opponents: [],
    isAdmin: false,
  },
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
)
export default store
