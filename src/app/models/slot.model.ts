import { BehaviorSubject } from "rxjs";
import { Symbol } from "./symbol.model";

export class Slot {
  symbol$: BehaviorSubject<Symbol | null>;
  animation$: BehaviorSubject<string | null>;

  constructor() {
    this.symbol$ = new BehaviorSubject<Symbol | null>(null);
    this.animation$ = new BehaviorSubject<string | null>(null);
  }
}