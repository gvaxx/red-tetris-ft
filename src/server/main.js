import params  from '../../params'
import socket from 'socket.io'
import debug from 'debug'
import express from 'express';
import Game from './Game';
const logerror = debug('tetris:error'), loginfo = debug('tetris:info')

const app = require('http').createServer();
const { host, port } = params
const games = {};
const io = socket(app, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.on('connection', function (socket) {
  loginfo("Socket connected: " + socket.id + ' ' + socket.handshake.headers.origin)
  socket.on("ping", (mes) => { loginfo(mes); });

  socket.on('create-game', (action) => {
    try {
      const game = new Game(action);
      games[game.roomName] = game;
      socket.emit('game-created', game.getHashUrlByName(action.playerName));
    } catch (e) {
      socket.emit('error', e);
    }
  })

  socket.on('join-game', (action) => {
    try {
      if (!(action.roomName in games)) {
        socket.emit('no-room');
        return
      }
      const game = games[action.roomName];
      if (action.playerName in game.getNames()) {
        socket.emit('name-already-taken');
        return
      }
      game.addPlayer(action);
      socket.emit('player-added', game.getHashUrlByName(action.playerName));
    } catch (e) {
      socket.emit('error', e);
    }
  })
})

app.listen({ host, port }, () =>{
    loginfo(`tetris listen on ${params.url}`)
})

