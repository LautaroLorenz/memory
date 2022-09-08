import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Board, BoardSize, Level, Symbol, generateRandomSymbols, BoardPosition, generateRandomPosition, LevelDifficultHandler } from 'src/app/models';

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
  private readonly startDifficult: number = 0;
  private readonly size: BoardSize = { rows: 4, cols: 6 };
  private readonly levelDifficultHandler = new LevelDifficultHandler();

  constructor(
    private router: Router,
    private readonly messageService: MessageService,
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

  private nextLevel(): void {
    this.level.incrementDifficult();
    this.levelDifficultHandler.setLevelParameters(this.level);
  }

  startRound(): void {
    this.nextLevel();
    this.gamming$.next(true);
    this.symbols = generateRandomSymbols(this.level.difficult$.value, this.level.validSymbols);
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
    }, this.level.time);
  }

  validar(): void {
    const correct = this.symbols.map(s => s.value).join("").toLowerCase();
    if (this.symbols.map(s => s.value).join("").toLowerCase() === this.playerInput.toLowerCase()) {
      this.messageService.add({
        severity: 'success',
        summary: 'Felicitaciones',
        detail: 'Ganaste la ronda',
        life: 1000,
        closable: false,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Auch, Perdiste',
        detail: `era ${correct.toUpperCase()}`,
        life: 3000,
        closable: false,
      });
      this.router.navigate(["../menu"]);
    }

    this.playerInput = "";
    this.gamming$.next(false);
    this.checking$.next(false);
  }

  ngOnInit(): void {
  }
}
