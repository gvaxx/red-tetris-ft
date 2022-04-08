import Player from "./Player";

export default class Game {
  constructor({ roomName, socketId, playerName }) {
    this.socketId = socketId;
    this.admin = new Player({ playerName, socketId });
    this.roomName = roomName;
    this.players = { playerName: this.admin };
    this.status = 'pending'
  }

  getHashUrlByName(playerName) {
    return `#${this.roomName}[${playerName}]`
  }

  addPlayer({ playerName, socketId }) {
    this.players.playerName = new Player({ playerName, socketId });
  }

  getNames() {
    return this.players.keys();
  }
}
