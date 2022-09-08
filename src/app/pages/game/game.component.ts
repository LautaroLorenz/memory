import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Board, BoardSize, Level, Symbol, generateRandomSymbols, BoardPosition, generateRandomPosition } from 'src/app/models';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerInput: string = "";
  readonly board: Board;
  readonly level: Level;
  readonly gamming$: BehaviorSubject<boolean>;
  readonly checking$: BehaviorSubject<boolean>;
  private symbols: Symbol[];
  private readonly startDifficult: number = 1;
  private readonly size: BoardSize = { rows: 4, cols: 6 };

  constructor(
    private router: Router,
  ) {
    this.board = new Board(this.size);
    this.level = new Level(this.startDifficult);
    this.symbols = [];
    this.gamming$ = new BehaviorSubject<boolean>(false);
    this.checking$ = new BehaviorSubject<boolean>(false);
  }

  private clearBoard(board: Board): void {
    for (const slot of board.slots) {
      slot.symbol$.next(null);
    }
  }

  startRound(): void {
    this.gamming$.next(true);
    this.symbols = generateRandomSymbols(this.level.difficult$.value);
    let currentIndex = 0;
    const interval = setInterval(() => {
      this.clearBoard(this.board);
      if (currentIndex === this.symbols.length) {
        this.checking$.next(true);
        clearInterval(interval);
        return;
      }
      const currentSymbol = this.symbols[currentIndex];
      const randomPosition: BoardPosition = generateRandomPosition(this.board);
      const slot = this.board.getSlot(randomPosition);
      slot.symbol$.next(currentSymbol);
      currentIndex++;
    }, 750);
  }

  validar(): void {
    if (this.symbols.map(s => s.value).join("").toLowerCase() === this.playerInput.toLowerCase()) {
      alert("Ganaste la ronda");
      this.level.incrementDifficult();
    } else {
      alert("ups perdiste");
      this.router.navigate(["../menu"]);
    }

    this.playerInput = "";
    this.gamming$.next(false);
    this.checking$.next(false);
  }

  ngOnInit(): void {}
}
