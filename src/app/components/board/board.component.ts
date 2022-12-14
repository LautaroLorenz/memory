import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;
  @Output() slotTouch = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
