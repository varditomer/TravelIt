import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelingPreviewComponent } from './traveling-preview.component';

describe('TravelingPreviewComponent', () => {
  let component: TravelingPreviewComponent;
  let fixture: ComponentFixture<TravelingPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelingPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
