import { VALIDATION } from '../actions/validation'
import { CREATE_OR_JOIN_GAME, CREATE_SOCKET } from '../actions/socket'
import { CHANGE_GAME } from '../actions/game'
import { requestStatus } from '../../public/types';
const reducer = (state = {}, action) => {
  switch (action.type) {
    case VALIDATION:
      const newError = {};
      newError[action.field] = action.error;
      return { ...state, errors: Object.assign({}, state.errors, newError) }
    case CREATE_OR_JOIN_GAME:
      if (action.requestStatus === requestStatus.SUCCESS) {
        return {
          ...state,
          game: Object.assign(state.game, action.result),
          isLoading: false,
        };
      } else if (action.requestStatus === requestStatus.FAILURE) {
        return {
          game: Object.assign(state.errors, action.errors),
          isLoading: false,
          ...state,
        };
      }
      return { ...state, isLoading: true };
    case CREATE_SOCKET:
      if (action.requestStatus === requestStatus.SUCCESS) {
        return {
          socket: action.result,
          isLoading: false,
          ...state,
        };
      } else if (action.requestStatus === requestStatus.FAILURE) {
        return {
          isLoading: false,
          ...state,
        };
      }
      return { isLoading: true, ...state };
    case CHANGE_GAME:
      return { game: Object.assign(state.game, action.game), ...state }
    default : 
      return state
  }
}
export default reducer

