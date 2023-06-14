import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelingListComponent } from './traveling-list.component';

describe('TravelingListComponent', () => {
  let component: TravelingListComponent;
  let fixture: ComponentFixture<TravelingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
