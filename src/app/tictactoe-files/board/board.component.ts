import { Component, OnInit, Input, Output ,EventEmitter, AfterContentInit} from '@angular/core';


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterContentInit {

  board: Array<[]>
  @Input() boardSize;
  @Input() currPlayer;
  @Input() isGameOver
  @Output() updatePlayerMove  = new EventEmitter<number[]>()
  constructor() { }

  ngAfterContentInit() {
    this.board = this.createBoard(this.boardSize);
  }

  createBoard(size : number) : Array<[]> {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push([...Array(size)])  
    }
    return arr
  }

  recieveCellInfo(cellCoordinates: number[]) {
    this.updatePlayerMove.emit(cellCoordinates)
  }
}


