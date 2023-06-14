import { Component, OnInit } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private travelService: TravelService
  ) { }
  travels$!: Observable<Travel[]>

  ngOnInit(): void {
    this.travelService.query()
    this.travels$ = this.travelService.travels$
  }
}
