import { BehaviorSubject } from "rxjs";

export class Level {
  difficult$: BehaviorSubject<number>;

  constructor(difficult: number) {
    this.difficult$ = new BehaviorSubject<number>(difficult);
  }

  incrementDifficult(): void {
    this.difficult$.next(this.difficult$.value + 1);
  }
}