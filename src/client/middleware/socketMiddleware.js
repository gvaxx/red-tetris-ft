import { requestStatus } from '../../public/types'
import { CREATE_SOCKET } from '../actions/socket';
export default async function socketMiddleware() {
    // Socket param is the client. We'll show how to set this up later.
    return ({dispatch, getState}) => next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
  
      /*
       * Socket middleware usage.
       * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
       * type: always 'socket'
       * types: [REQUEST, SUCCESS, FAILURE]
       */
      const { promise, type, ...rest } = action;
  
      if (type !== CREATE_OR_JOIN_GAME || type !== CREATE_SOCKET || !promise) {
        // Move on! Not a socket request or a badly formed one.
        return next(action);
      }
      if (type === CREATE_SOCKET) {
        try {
          const socket = await promise();
          return next({...rest, socket, requestStatus: SUCCESS });
        } catch (e) {
          return next({...rest, requestStatus: FAILURE });
        }
      }

      const { PENDING, SUCCESS, FAILURE } = requestStatus;
      next({...rest, requestStatus: PENDING });
  
      return promise()
        .then((result) => {
          return next({...rest, result, requestStatus: SUCCESS });
        })
        .catch((error) => {
          return next({...rest, error, requestStatus: FAILURE });
        })
    };
  }