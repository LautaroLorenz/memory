import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratsComponent } from './congrats/congrats.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';
import { TouchComponent } from './touch/touch.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    component: MenuComponent,
    path: 'menu'
  },
  {
    component: GameComponent,
    path: 'game'
  },
  {
    component: CongratsComponent,
    path: 'congrats'
  },
  {
    component: TouchComponent,
    path: 'touch'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
