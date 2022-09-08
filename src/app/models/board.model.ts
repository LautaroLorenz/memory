import { Random } from "./random.model";
import { Slot } from "./slot.model";

function generateSlots(size: BoardSize): Slot[] {
  const slots: Slot[] = []
  for (let i = 0; i < size.rows * size.cols; i++) {
    slots.push(new Slot());
  }
  return slots;
}

export interface BoardSize {
  rows: number;
  cols: number;
}

export interface BoardPosition {
  index: number;
}

export function generateRandomPosition(board: Board): BoardPosition {
  return {
    index: Random.range(board.size.rows * board.size.cols)
  };
}

export class Board {
  readonly slots: Slot[];
  readonly size: BoardSize;

  constructor(size: BoardSize) {
    this.size = size;
    this.slots = generateSlots(size);
  }

  getSlot(position: BoardPosition): Slot {
    return this.slots[position.index];
  }
}