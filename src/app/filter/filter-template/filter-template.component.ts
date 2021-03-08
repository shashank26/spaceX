import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-template',
  templateUrl: './filter-template.component.html',
  styleUrls: ['./filter-template.component.scss']
})
export class FilterTemplateComponent implements OnInit {
  @Input() filterName: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
