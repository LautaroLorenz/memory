import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Slot } from 'src/app/models';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent implements OnInit {

  @Input() slot!: Slot;

  constructor() { }

  ngOnInit(): void {
  }

}
