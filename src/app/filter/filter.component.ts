import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public years: number[] = [];
  public filters: any = {};
  private currentYear = (new Date()).getUTCFullYear();
  private startYear = 2006;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.years = Array.from({ length: this.currentYear - this.startYear + 1 }, (_, i) => i + this.startYear);
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(e => {
      e.keys.forEach(k => {
        this.filters[k] = this.activeRoute.snapshot.queryParamMap.get(k);
      });
    });
  }

  navigateTo(key: any, value: any): void {
    const val = this.filters[key];
    if (val === String(value)) {
      delete this.filters[key];
    } else {
      this.filters[key] = value;
    }

    this.router.navigate(['/launch-programs'], {
      queryParams: this.filters,
    });
  }
}
