import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerOverviewComponent } from './timer-overview.component';

describe('TimerOverviewComponent', () => {
  let component: TimerOverviewComponent;
  let fixture: ComponentFixture<TimerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
