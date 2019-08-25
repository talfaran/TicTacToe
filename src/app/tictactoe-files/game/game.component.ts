import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  currPlayer: number
  boardSize: number
  isGameOver: boolean;
  winningText: string
  constructor(private gameService: GameService) {

    this.boardSize = 3
  }

  ngOnInit() {
    this.getGameState();
    this.gameService.createPlayerDataStorage(this.boardSize)
  }



  assignBoardSize(size) {
    //the size is not really limited, but for display purposes, decided to keep it up to 30
    //This function isn't isn use at the moment since the user can't control the board size from the UI
    if (size > 30) {
      console.error("size cannot exceed 30")
      return
    }
  }

  recievePlayerMove(coordinates: number[]) {
    this.gameService.updatePlayerMove(coordinates, this.boardSize);
    this.getGameState();

  }

  getGameState() {
    this.currPlayer = this.gameService.currPlayer
    this.isGameOver = this.gameService.isGameOver
    this.winningText = this.gameService.endGameText
  }

  restartGame() {
    this.gameService.restartGame(this.boardSize)
    this.getGameState();
  }



}
