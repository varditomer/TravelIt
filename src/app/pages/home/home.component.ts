import { Component, OnInit } from '@angular/core';
import { Travel, SortBy } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private travelService: TravelService
  ) { }
  travels$ = this.travelService.travels$
  sortBy$ = this.travelService.sortBy$

  removeTravel = (travelToRemove: Travel) => {
    this.travelService.remove(travelToRemove)
  }

  sortTableBy = (sortBy: SortBy) => {
    this.travelService.sortTableBy(sortBy)
  }
}
