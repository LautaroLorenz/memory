import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Board, BoardPosition, BoardSize, generateRandomPosition, Level, LevelDifficultHandler } from 'src/app/models';

@Component({
  templateUrl: './touch.component.html',
  styleUrls: ['./touch.component.scss']
})
export class TouchComponent implements OnInit {

  startWording: string = "Comenzar";
  readonly board: Board;
  readonly level: Level;
  readonly gamming$: BehaviorSubject<boolean>;
  readonly checking$: BehaviorSubject<boolean>;
  private record: boolean = false;
  private readonly startDifficult: number = 0;
  private readonly size: BoardSize = { rows: 4, cols: 6 };
  private readonly levelDifficultHandler = new LevelDifficultHandler();
  private mode!: string;
  private positionsHistory: BoardPosition[] = [];
  private touchCounter!: number;

  constructor(
      private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {
    this.board = new Board(this.size);
    this.level = new Level(this.startDifficult);
    this.gamming$ = new BehaviorSubject<boolean>(false);
    this.checking$ = new BehaviorSubject<boolean>(false);
  }

  private clearBoard(board: Board): void {
    for (const slot of board.slots) {
      slot.animation$.next(null);
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

  private checkPoint(): void {
    const actualPoint = Number(localStorage.getItem(this.mode) ?? 0);
    if (actualPoint < this.level.difficult$.value) {
      if (!this.record) {
        this.record = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Felicitaciones',
          detail: '¡ Nuevo record !',
          closable: false,
          life: 2000
        });
      }
      localStorage.setItem(this.mode, this.level.difficult$.value.toString());
    }
  }

  startRound(): void {
    this.nextLevel();
    this.gamming$.next(true);
    let currentIndex = 0;
    this.clearBoard(this.board);
    const interval = setInterval(() => {
      this.clearBoard(this.board);
      if (currentIndex === this.level.difficult$.value) {
        this.touchCounter = 0;
        this.checking$.next(true);
        clearInterval(interval);
        return;
      }
      const lastPosition = this.positionsHistory[this.positionsHistory.length - 1] ?? undefined;
      const newPosition = this.newRandomPosition(lastPosition);
      if (this.positionsHistory[currentIndex] === undefined) {
        this.positionsHistory.push(newPosition);
      }
      const slot = this.board.getSlot(this.positionsHistory[currentIndex]);
      slot.animation$.next('rotate');
      currentIndex++;
    }, 500);
  }

  slotTouch(slotIndex: number): void {
    if (!this.checking$.value) {
      return;
    }
    this.clearBoard(this.board);
    const position: BoardPosition = { index: slotIndex };
    const slot = this.board.getSlot(position);
    slot.animation$.next('touched');

    if (this.positionsHistory[this.touchCounter].index !== slotIndex) {
      this.messageService.add({
        severity: 'error',
        summary: 'Auch, Perdiste',
        life: 3000,
        closable: false,
      });
      this.router.navigate(["../congrats"], {
        queryParams: {
          record: this.record,
          difficult: this.level.difficult$.value
        }
      });
    } else if (this.touchCounter === this.positionsHistory.length - 1) {
      this.messageService.add({
        severity: 'info',
        detail: 'Ganaste la ronda',
        life: 1000,
        closable: false,
      });
          this.checkPoint();
      this.startWording = "Continuar";
      this.gamming$.next(false);
      this.checking$.next(false);
    }
    this.touchCounter++;
  }

  @HostListener('window:keydown.enter', [])
  onKeyDown() {
    if (this.gamming$.value === false) {
      this.startRound();
    }
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParamMap.get('mode') || "";
  }
}
