import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public years: number[] = [];
  public filters = {
    launch_success: '',
    land_success: '',
    launch_year: ''
  };
  private currentYear = (new Date()).getUTCFullYear();
  private startYear = 2006;

  constructor(private router: Router) {
    this.years = Array.from({ length: this.currentYear - this.startYear + 1 }, (_, i) => i + this.startYear);
  }

  ngOnInit(): void {
  }
}
