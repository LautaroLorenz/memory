import { Level } from "../level.model";
import { AbstractLevelHandler } from "./level-handler.model";

export class Level_4 extends AbstractLevelHandler {
  override handle(level: Level): Level {
    if (level.difficult$.value !== 4) {
      return super.handle(level);
    }

    level.time = 850;
    return level;
  }

}