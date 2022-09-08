import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  modes: any[] = [];
  selectedModeCode!: string;

  constructor(
    private readonly messageService: MessageService,
  ) {
    this.modes = [
      { name: 'ALEATORIO', code: 'ALEATORIO' },
      { name: 'INCREMENTAL', code: 'INCREMENTAL' },
    ];
  }

  startGaming(): void {
    this.messageService.clear();
  }

  ngOnInit(): void {
  }

}
