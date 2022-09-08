import { Level } from "../level.model";

export interface LevelHandler {
  setNext(handler: LevelHandler): LevelHandler;

  handle(level: Level): Level;

}


export abstract class AbstractLevelHandler implements LevelHandler {
  private nextHandler!: LevelHandler;

  public setNext(handler: LevelHandler): LevelHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(level: Level): Level {
    if (this.nextHandler) {
      return this.nextHandler.handle(level);
    }
    return level;
  }
}