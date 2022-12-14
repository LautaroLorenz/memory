import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../components/components.module";
import { MenuComponent } from "./menu/menu.component";
import { GameComponent } from './game/game.component';
import { FormsModule } from "@angular/forms";
import { CongratsComponent } from './congrats/congrats.component';
import { TouchComponent } from './touch/touch.component';

@NgModule({
  declarations: [
    MenuComponent,
    GameComponent,
    CongratsComponent,
    TouchComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
  ],
  exports: [],
  providers: []
})
export class PagesModule { }