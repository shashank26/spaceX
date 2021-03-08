import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchProgramItemComponent } from './launch-program-item.component';

describe('LaunchProgramItemComponent', () => {
  let component: LaunchProgramItemComponent;
  let fixture: ComponentFixture<LaunchProgramItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchProgramItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchProgramItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
