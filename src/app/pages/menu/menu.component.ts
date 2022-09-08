import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(
    private readonly messageService: MessageService,
  ) {
    this.items = [];
  }

  startGaming(): void {
    this.messageService.clear();
  }

  ngOnInit(): void {
  }

}
