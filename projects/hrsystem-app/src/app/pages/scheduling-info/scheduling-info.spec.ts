import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingInfoComponent } from './scheduling-info';

describe('SchedulingInfoComponent', () => {
  let component: SchedulingInfoComponent;
  let fixture: ComponentFixture<SchedulingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
