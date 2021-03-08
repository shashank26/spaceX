import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketImageComponent } from './rocket-image.component';

describe('RocketImageComponent', () => {
  let component: RocketImageComponent;
  let fixture: ComponentFixture<RocketImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RocketImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RocketImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
