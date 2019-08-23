export class ticTacToePlayer {
    gameWon = 0;
    rows :Array<number>
    columns : Array<number>;
    diag : Array<number>
    userSymbol : number;

    constructor(symbol) {
        this.userSymbol = symbol
    }

}

export enum playerSymbols {
    'x' = 1,
    'o' = -1
}