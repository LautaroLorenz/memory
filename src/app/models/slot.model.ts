import { BehaviorSubject } from "rxjs";
import { Symbol } from "./symbol.model";

export class Slot {
  symbol$: BehaviorSubject<Symbol | null>;

  constructor() {
    this.symbol$ = new BehaviorSubject<Symbol | null>(null);
  }
}