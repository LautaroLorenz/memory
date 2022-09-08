import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private mode!: string;
  private positionsHistory: BoardPosition[] = [];

  @ViewChild('inputElement', { static: false }) inputElement!: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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

  private newRandomPosition(currentPosition: BoardPosition) {
    let newPosition: BoardPosition;
    // prevent repeat current position
    do {
      newPosition = generateRandomPosition(this.board);
    } while (currentPosition && currentPosition.index === newPosition.index);
    return newPosition;
  }

  private symbolsByMode(level: Level, mode: string): Symbol[] {
    if (mode === 'ALEATORIO') {
      return generateRandomSymbols(this.level.difficult$.value, this.level.validSymbols);
    }
    if (mode === 'INCREMENTAL') {
      return this.symbols.concat(generateRandomSymbols(1, this.level.validSymbols));
    }
    return [];
  }

  private checkPoint(): void {
    const actualPoint = Number(localStorage.getItem(this.mode) ?? 0);
    if (actualPoint < this.level.difficult$.value) {
      this.messageService.add({
        severity: 'success',
        summary: 'Felicitaciones',
        detail: '¡ Nuevo record !',
        closable: false,
        life: 2000
      });
      localStorage.setItem(this.mode, this.level.difficult$.value.toString());
    }
  }

  startRound(): void {
    this.nextLevel();
    this.gamming$.next(true);
    this.symbols = this.symbolsByMode(this.level, this.mode);
    let currentIndex = 0;
    const interval = setInterval(() => {
      this.clearBoard(this.board);
      if (currentIndex === this.symbols.length) {
        setTimeout(() => {
          const input = this.inputElement.nativeElement as HTMLInputElement;
          input.focus();
        }, 50);
        this.checking$.next(true);
        clearInterval(interval);
        return;
      }
      const currentSymbol = this.symbols[currentIndex];

      const lastPosition = this.positionsHistory[this.positionsHistory.length - 1] ?? undefined;
      const newPosition = this.newRandomPosition(lastPosition);
      this.positionsHistory.push(newPosition);
      const position = this.mode === 'INCREMENTAL' ? this.positionsHistory[currentIndex] : newPosition;
      const slot = this.board.getSlot(position);

      slot.symbol$.next(currentSymbol);
      currentIndex++;
    }, this.level.time);
  }

  validar(): void {
    const correct = this.symbols.map(s => s.value).join("").toLowerCase();
    if (this.symbols.map(s => s.value).join("").toLowerCase() === this.playerInput.toLowerCase()) {
      this.messageService.add({
        severity: 'info',
        detail: 'Ganaste la ronda',
        life: 1000,
        closable: false,
      });
      this.checkPoint();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Auch, Perdiste',
        detail: `respuesta ${correct.toUpperCase()}`,
        closable: true,
        life: 7000
      });
      this.router.navigate(["../menu"]);
    }

    this.playerInput = "";
    this.gamming$.next(false);
    this.checking$.next(false);
  }

  checkLengthValidar(): void {
    const length = this.inputElement.nativeElement.value.length;
    if (length === this.symbols.length) {
      this.validar();
    }
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParamMap.get('mode') || "";
  }
}
