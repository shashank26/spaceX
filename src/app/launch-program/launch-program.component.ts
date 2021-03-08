import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LaunchProgramModel } from '../models/launch-program.model';
import { subjectMapKeys } from '../models/subjectMapKeys';
import { LaunchProgramService } from '../services/launch-program.service';

@Component({
  selector: 'app-launch-program',
  templateUrl: './launch-program.component.html',
  styleUrls: ['./launch-program.component.scss']
})
export class LaunchProgramComponent implements OnInit {

  isLoading = false;
  launchProgramData: Observable<LaunchProgramModel[]> = of([]);
  private offset = 0;
  private limit = 10;
  private filters = {};


  constructor(private launchProgramService: LaunchProgramService, private activatedRoute: ActivatedRoute) {
    if (this.launchProgramService.browserType === 'MOBILE') {
      this.limit = 4;
    }
    this.launchProgramData =
      this.launchProgramService.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS) as BehaviorSubject<LaunchProgramModel[]>;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(e => {
      this.offset = 0;
      this.filters = e;
      this.launchProgramService.getLaunchPrograms(this.limit, this.offset, e);
    });
  }

  async loadMoreData(): Promise<void> {
    this.isLoading = true;
    this.offset++;
    await this.launchProgramService.getLaunchPrograms(this.limit, this.offset * this.limit, this.filters, true);
    this.isLoading = false;
  }
}

