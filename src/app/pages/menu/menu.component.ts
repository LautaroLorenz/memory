import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    touch: number,
  } = {
    aleatorio: 0,
    incremental: 0,
    touch: 0,
  }

  constructor(
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
    this.modes = [
      { name: 'ALEATORIO', code: 'ALEATORIO', page: '../game' },
      { name: 'INCREMENTAL', code: 'INCREMENTAL', page: '../game' },
      { name: 'TOUCH', code: 'TOUCH', page: '../touch' },
    ];
  }

  startGaming(): void {
    localStorage.setItem('selectedModeCode', this.selectedModeCode);
    this.messageService.clear();
    this.router.navigate([this.modes.find(m => m.code === this.selectedModeCode).page], {
      queryParams: {
        mode: this.selectedModeCode
      }
    })
  }

  ngOnInit(): void {
    this.ranking.aleatorio = Number(localStorage.getItem('ALEATORIO') ?? 0);
    this.ranking.incremental = Number(localStorage.getItem('INCREMENTAL') ?? 0);
    this.ranking.touch = Number(localStorage.getItem('TOUCH') ?? 0);
    this.selectedModeCode = localStorage.getItem('selectedModeCode') || "";
  }

}
