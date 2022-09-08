import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() {
    this.items = [];
   }

  ngOnInit(): void {
  }

}
