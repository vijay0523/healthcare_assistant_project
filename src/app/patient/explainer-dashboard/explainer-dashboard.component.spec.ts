import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainerDashboardComponent } from './explainer-dashboard.component';

describe('ExplainerDashboardComponent', () => {
  let component: ExplainerDashboardComponent;
  let fixture: ComponentFixture<ExplainerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplainerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
