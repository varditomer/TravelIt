import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelingTableComponent } from './traveling-table.component';

describe('TravelingTableComponent', () => {
  let component: TravelingTableComponent;
  let fixture: ComponentFixture<TravelingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
