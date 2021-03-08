import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
      providers: [LaunchProgramService, HttpClient],
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
    component.launchProgramData.subscribe(data => {
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});
