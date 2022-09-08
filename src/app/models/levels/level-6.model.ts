import { Level } from "../level.model";
import { AbstractLevelHandler } from "./level-handler.model";

export class Level_6 extends AbstractLevelHandler {
  override handle(level: Level): Level {
    if (level.difficult$.value !== 6) {
      return super.handle(level);
    }

    level.validSymbols = level.validSymbols.concat("T");
    return level;
  }

}