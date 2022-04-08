export const CREATE_OR_JOIN_GAME = 'CREATE_OR_JOIN_GAME';
export const CREATE_SOCKET = 'CREATE_SOCKET';
import socketIOClient from 'socket.io-client';

const host = 'http://localhost:3004/';

function connect() {
  socket = socketIOClient(host);
  return new Promise((resolve, reject) => {
    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', (error) => reject(error));
  });
}

  function disconnect() {
    return new Promise((resolve) => {
      socket.disconnect(() => {
        socket = null;
        resolve();
      });
    });
  }

  const emit = (socket, event, data) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket connection.');

      return socket.emit(event, data, (response) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  const on = (socket, event, fun) => {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket connection.');

      socket.on(event, fun);
      resolve();
    });
  }

export const createOrJoinGame = (socket, roomName, playerName) => {
  const creditinals = { roomName, playerName };
  return {
    type: CREATE_OR_JOIN_GAME,
    promise: () => emit(socket, 'SendMessage', creditinals),
  }
}
export const createSocket = () => {
  const creditinals = { roomName, playerName };
  return {
    type: CREATE_OR_JOIN_GAME,
    promise: () => connect(),
  }
}