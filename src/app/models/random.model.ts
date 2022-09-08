export class Random {
  static range(max: number): number {
    return Math.floor(Math.random() * max);
  }
}