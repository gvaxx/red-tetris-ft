import socketIOClient from 'socket.io-client';

export const createSocket = () => socketIOClient('http://localhost:3004/');

export const createGame = (socket, params) => socket.emit('create-game', params);

export const joinGame = (socket, params) => socket.emit('join-game', params);

export const startGame = (socket, params) => socket.emit('start-game', params);
