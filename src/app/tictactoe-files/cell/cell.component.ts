import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GameService } from '../game.service';
import { playerSymbols } from '../game-models/player-models';


@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnChanges {
  XplayerIcon = require('../../../assets/Xplayer.svg')
  OplayerIcon = require('../../../assets/Oplayer.svg')
  @Input('coord') coordinates: Array<number>; //**first item representing the row, the second the column */
  @Input() rowSize: number;
  @Input() currPlayer;
  @Input() isGameOver
  @Output() onCellPressed = new EventEmitter<number[]>()

  cellPressedBy;
  cellIcon
  constructor() { }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.hasOwnProperty('isGameOver')){
      if(
        changes.isGameOver.previousValue === true && 
        changes.isGameOver.currentValue === false
        ) {
          this.cellPressedBy = undefined;
          this.cellIcon = undefined;
        }
    }
  }
  _onCellPressed() {
    if (this.cellPressedBy || this.isGameOver) return;
    this.cellPressedBy = this.currPlayer;
    this.cellIcon = this.getCellIcon(this.cellPressedBy)
    this.onCellPressed.emit(this.coordinates)
  }

  getCellIcon(player) {
    switch (player) {
      case playerSymbols.x:
        return this.XplayerIcon
      case playerSymbols.o:
        return this.OplayerIcon
    }
  }

}
