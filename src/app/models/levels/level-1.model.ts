import { Level } from "../level.model";
import { AbstractLevelHandler } from "./level-handler.model";

export class Level_1 extends AbstractLevelHandler {
  override handle(level: Level): Level {
    if (level.difficult$.value !== 1) {
      return super.handle(level);
    }

    level.validSymbols = "FW";
    level.time = 500;
    return level;
  }

}