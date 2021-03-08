import { Component, Input, OnInit } from '@angular/core';
import { LaunchProgramModel } from 'src/app/models/launch-program.model';

@Component({
  selector: 'app-launch-program-item',
  templateUrl: './launch-program-item.component.html',
  styleUrls: ['./launch-program-item.component.scss']
})
export class LaunchProgramItemComponent implements OnInit {

  @Input() info: any;
  mapKeys: string[] = [];

  fieldToLabelMap = new Map([
    ['missionIds', 'Mission Ids'],
    ['launchYear', 'Launch Year'],
    ['successfulLaunch', 'Successful Launch'],
    ['successfulLanding', 'Successful Landing'],
  ]);

  constructor() { 
    this.mapKeys = Array.from(this.fieldToLabelMap.keys());
  }

  ngOnInit(): void {
  }

  isValueOfTypeArray(value: any) {
    return Array.isArray(value);
  }

}
