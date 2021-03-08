import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rocket-image',
  templateUrl: './rocket-image.component.html',
  styleUrls: ['./rocket-image.component.scss']
})
export class RocketImageComponent implements OnInit {

  @Input() image = '';
  @Input() flightNumber = '';
  @Input() missionName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
