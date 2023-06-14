import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelingFormComponent } from './traveling-form.component';

describe('TravelingFormComponent', () => {
  let component: TravelingFormComponent;
  let fixture: ComponentFixture<TravelingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
