import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  modes: any[] = [];
  selectedModeCode!: string;
  ranking: {
    aleatorio: number,
    incremental: number,
  } = {
    aleatorio: 0,
    incremental: 0
  }

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
    this.ranking.aleatorio = Number(localStorage.getItem('ALEATORIO') ?? 0);
    this.ranking.incremental = Number(localStorage.getItem('INCREMENTAL') ?? 0);
  }

}
