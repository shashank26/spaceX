import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  launchProgramData: LaunchProgramModel[] = [];
  showItems = true;
  private offset = 0;
  private limit = 10;
  private filters = {};


  constructor(private launchProgramService: LaunchProgramService,
              private activatedRoute: ActivatedRoute) {
    if (this.launchProgramService.browserType === 'MOBILE') {
      this.limit = 4;
    }
    
    this.launchProgramData = this.launchProgramService.getInitialDataFromState(this.limit, this.offset, this.activatedRoute.snapshot.queryParams);
  }

  ngOnInit(): void {

    this.launchProgramService.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS)?.subscribe(data => {
      if (data.length > 0) {
        this.launchProgramData = data;
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.offset = 0;
      this.filters = params;
      this.launchProgramService.getLaunchPrograms(this.limit, this.offset, this.filters);
    });
  }

  async loadMoreData(): Promise<void> {
    this.isLoading = true;
    this.offset++;
    await this.launchProgramService.getLaunchPrograms(this.limit, this.offset * this.limit, this.filters, true);
    this.isLoading = false;
  }
}

