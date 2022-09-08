import { Random } from "./random.model";

const VALID_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateRandomSymbols(length: number): Symbol[] {
  const symbols = [];
  for (let i = 0; i < length; i++) {
    const randomValue = VALID_SYMBOLS[Random.range(VALID_SYMBOLS.length)];
    symbols.push(new Symbol(randomValue));
  }
  return symbols;
}

export class Symbol {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}