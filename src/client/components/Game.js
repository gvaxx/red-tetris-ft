import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { createOrJoinGame, createSocket } from '../actions/socket'
import { hasErrors } from '../helpers';

const Game = () => {
  const { roomName, playerName } = useParams();
  const game = useSelector(state => state.game)
  const socket = useSelector(state => state.socket)
  const errors = useSelector(state => state.errors)
  const history = useHistory();
  useEffect(() => {
    if (socket) {
      dispatch(createOrJoinGame(socket, playerName, roomName));
    } else {
      dispatch(createSocket());
    }
    if (hasErrors(errors)) {
      history.push('/')
    }
  });
  const dispatch = useDispatch();
  return (
    <div>{playerName} {roomName}</div>
  )
}
export default Game
