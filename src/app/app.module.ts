import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CellComponent } from './tictactoe-files/cell/cell.component';
import { BoardComponent } from './tictactoe-files/board/board.component';
import { GameService } from './tictactoe-files/game.service';
import { GameComponent } from './tictactoe-files/game/game.component';

@NgModule({
  declarations: [

    CellComponent,
    BoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [GameComponent]
})
export class AppModule { }
