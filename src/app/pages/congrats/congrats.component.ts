import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  difficult!: number;
  record!: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) { }

  ngOnInit(): void {
    this.difficult = +(this.route.snapshot.queryParamMap.get('difficult') || 0);
    this.record = (this.route.snapshot.queryParamMap.get('record') === 'true' || false);
  }

  back(): void {
    this.location.back();
  }

  @HostListener('window:keydown.enter', [])
  onKeyDown() {
    this.back();
  }
}
