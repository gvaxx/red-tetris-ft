import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { createGame, joinGame } from '../services/socket'
import { useSelector, useDispatch } from 'react-redux'
import { validation } from '../actions/validation'
import { useHistory } from 'react-router-dom'
import { changeGame } from '../actions/game'

const Menu = () => {
  const socket = 'a';

  const [playerNameError, roomNameError] = useSelector((state) => [state.errors.playerName, state.errors.roomName]);
  const game = useSelector((state) => state.game);
  const history = useHistory();
  const dispatch = useDispatch();
  

  function validateRoomCode(event) {
    if (event.target.value && !validateInput(event.target.value)) {
      dispatch(validation('roomName', 'It is not valid room name!'));
    } else {
      dispatch(validation('roomName'));
    }
    dispatch(changeGame({ roomName: event.target.value }))
  }

  function validatePlayerName(event) {
    if (event.target.value && !validateInput(event.target.value)) {
      dispatch(validation('playerName', 'It is not valid player name!'));
    } else {
      dispatch(validation('playerName'));
    }
    dispatch(changeGame({ playerName: event.target.value }))
  }

  const playerFieldClasses = classNames({
    'nes-input': true,
    'is-error': playerNameError,
  });

  const roomFieldClasses = classNames({
    'nes-input': true,
    'is-error': roomNameError,
  });

  const hasErrors = () => roomNameError || playerNameError;

  const onJoinGame = () => {
    if (hasErrors()) {
      if (game.playerName === '') {
        dispatch(validation('playerName', 'You should choose a name!'));
      }
      if (game.roomName === '') {
        dispatch(validation('roomName', 'You should set room name!'));
      }
      return ;
    }
    history.push(`/${game.roomName}[${game.playerName}]`);
  };

  const onCreateGame = () => {
    if (hasErrors()) {
      if (game.playerName === '') {
        dispatch(validation('playerName', 'You should choose a name!'));
      }
      if (game.roomName === '') {
        dispatch(validation('roomName', 'You should set room name!'));
      }
      return;
    }
    history.push(`/${game.roomName}[${game.playerName}]`);
  };

  return (
    <div>
      <div className="nes-field is-inline">
        <label >Your name</label>
        <input onChange={validatePlayerName} value={game.playerName} type="text" id="name_field" className={playerFieldClasses}/>
      </div>
      {playerNameError && <span className="nes-text is-error">{playerNameError}</span>}
      <div className="nes-field is-inline">
        <label >Room name</label>
        <input onChange={validateRoomCode} value={game.roomName} type="text" id="room_field" className={roomFieldClasses}/>      
      </div>
      {roomNameError && <span className="nes-text is-error">{roomNameError}</span>}
        <a onClick={onJoinGame} className="nes-btn" href="#">Join the game</a>
        <a onClick={onCreateGame} className="nes-btn is-success" href="#">Create a game</a>
    </div>
  )
}
export default Menu
