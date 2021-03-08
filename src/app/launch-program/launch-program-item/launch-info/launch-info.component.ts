import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-launch-info',
  templateUrl: './launch-info.component.html',
  styleUrls: ['./launch-info.component.scss']
})
export class LaunchInfoComponent implements OnInit {

  @Input() title = '';
  
  constructor() { 
  }

  ngOnInit(): void {
  }
}
