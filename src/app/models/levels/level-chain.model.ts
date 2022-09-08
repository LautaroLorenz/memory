import { Level } from "../level.model";
import { Level_1 } from "./level-1.model";
import { Level_2 } from "./level-2.model";
import { Level_4 } from "./level-4.model";
import { Level_5 } from "./level-5.model";
import { Level_6 } from "./level-6.model";

export class LevelDifficultHandler {
  level_1 = new Level_1();
  level_2 = new Level_2();
  level_4 = new Level_4();
  level_5 = new Level_5();
  level_6 = new Level_6();

  constructor() {
    this.level_1
      .setNext(this.level_2)
      .setNext(this.level_4)
      .setNext(this.level_5)
      .setNext(this.level_6);
  }

  setLevelParameters(level: Level): Level {
    return this.level_1.handle(level);
  }
}