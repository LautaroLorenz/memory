import { Level } from "../level.model";
import { AbstractLevelHandler } from "./level-handler.model";

export class Level_5 extends AbstractLevelHandler {
  override handle(level: Level): Level {
    if (level.difficult$.value !== 5) {
      return super.handle(level);
    }

    level.time = 900;
    return level;
  }

}