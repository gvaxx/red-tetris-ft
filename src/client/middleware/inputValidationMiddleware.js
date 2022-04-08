import { CHANGE_GAME } from '../actions/game'

function validateInput(value) {
  return /^[A-Za-z_1-9-]+$/.test(value)
} 

export default async function socketMiddleware() {
  return ({dispatch, getState}) => next => action => {

    const { type, game } = action;

    if (type === CHANGE_GAME)
      return next(action);
    }

    if (type === CHANGE_GAME)
      return next(action);
    }

    return next(action);
  }