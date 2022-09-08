import { BehaviorSubject } from "rxjs";

export class Level {
  difficult$: BehaviorSubject<number>;
  validSymbols: string;
  time: number;

  constructor(difficult: number) {
    this.difficult$ = new BehaviorSubject<number>(difficult);
    this.validSymbols = ""; 
    this.time = 750; 
  }

  incrementDifficult(): void {
    this.difficult$.next(this.difficult$.value + 1);
  }
}