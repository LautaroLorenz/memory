import { Random } from "./random.model";

export function generateRandomSymbols(length: number, possibleSymbols: string): Symbol[] {
  const symbols = [];
  for (let i = 0; i < length; i++) {
    const randomValue = possibleSymbols[Random.range(possibleSymbols.length)];
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