import { Injectable } from '@angular/core';
import { playerSymbols, ticTacToePlayer } from './game-models/player-models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  //game is currenlty hard coded for 2 players only
  //to do: create array of players and dont hardcode 2 players.
  playerOne = new ticTacToePlayer(playerSymbols.x);
  PlayerTwo = new ticTacToePlayer(playerSymbols.o);

  currPlayer = playerSymbols.x;
  isGameOver = false
  winningText = "has won the game!"
  endGameText : string;
  private numOfTurns = 0
  constructor() { }

  ///create a representation of the board devided by rows, columns and diags.
  //right now, adding default of 2 Diags, in the thought of winning state stays a streak of cels in table size(-1)
  //first diag in array is top left -> bottom right
  createPlayerDataStorage(boardSize) {
    this.playerOne.columns = Array(boardSize).fill(0);
    this.playerOne.rows = Array(boardSize).fill(0)
    this.playerOne.diag = Array(2).fill(0)
    this.PlayerTwo.columns = Array(boardSize).fill(0);
    this.PlayerTwo.rows = Array(boardSize).fill(0)
    this.PlayerTwo.diag = Array(2).fill(0)
  }

  updatePlayerMove(coordinates: number[], boardSize) {
    this.numOfTurns++;
    if (this.currPlayer === playerSymbols.x) {
      this.playerOne.rows[coordinates[0]]++;
      this.playerOne.columns[coordinates[1]]++;
      if (coordinates[0] === coordinates[1]) this.playerOne.diag[0]++;
      if ((coordinates[0] + coordinates[1]) === boardSize - 1) this.playerOne.diag[1]++;
      this.checkWinOrTie(coordinates, boardSize);
      this.currPlayer = playerSymbols.o
    } else {
      this.PlayerTwo.rows[coordinates[0]]++;
      this.PlayerTwo.columns[coordinates[1]]++;
      if (coordinates[0] === coordinates[1]) this.PlayerTwo.diag[0]++;
      if ((coordinates[0] + coordinates[1]) === boardSize - 1) this.PlayerTwo.diag[1]++;
      this.checkWinOrTie(coordinates, boardSize);
      this.currPlayer = playerSymbols.x
    }
  }


  private checkWinOrTie(coordinates: number[], boardSize) {
    if (this.numOfTurns < (boardSize * 2) - 2) return
    if (this.currPlayer === playerSymbols.x) {
      if (
        this.playerOne.columns[coordinates[1]] === boardSize ||
        this.playerOne.rows[coordinates[0]] === boardSize ||
        this.playerOne.diag[0] === boardSize ||
        this.playerOne.diag[1] === boardSize
      ) {
        this.isGameOver = true
       this.endGameText = `X ${this.winningText}`
      }
    } else {
      if (
        this.PlayerTwo.columns[coordinates[1]] === boardSize ||
        this.PlayerTwo.rows[coordinates[0]] === boardSize ||
        this.PlayerTwo.diag[0] === boardSize ||
        this.PlayerTwo.diag[1] === boardSize
      ) {
        this.isGameOver = true
        this.endGameText = `O ${this.winningText}`
      }
    }

    if(!this.isGameOver && this.numOfTurns === boardSize*boardSize) {
      this.isGameOver = true;
      this.endGameText = "game ended in a tie!"
    }

  }

  restartGame(boardSize) {
    this.createPlayerDataStorage(boardSize);
    this.isGameOver = false;
    this.currPlayer =playerSymbols.x
    this.endGameText = "";
    this.numOfTurns = 0;
  }
}
