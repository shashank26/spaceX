import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { subjectMapKeys } from '../models/subjectMapKeys';
import { LaunchProgramService } from '../services/launch-program.service';

import { LaunchProgramComponent } from './launch-program.component';

describe('LaunchProgramComponent', () => {
  let component: LaunchProgramComponent;
  let fixture: ComponentFixture<LaunchProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [LaunchProgramService, HttpClient, TransferState],
      declarations: [LaunchProgramComponent]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LaunchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', async (done) => {
    const lsp = fixture.debugElement.injector.get(LaunchProgramService);
    await component.loadMoreData();
    lsp.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS)?.subscribe(data => {
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});
