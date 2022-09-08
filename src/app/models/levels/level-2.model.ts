import { Level } from "../level.model";
import { AbstractLevelHandler } from "./level-handler.model";

export class Level_2 extends AbstractLevelHandler {
  override handle(level: Level): Level {
    if (level.difficult$.value !== 2) {
      return super.handle(level);
    }

    level.validSymbols = "TY";
    level.time = 750;
    return level;
  }

}