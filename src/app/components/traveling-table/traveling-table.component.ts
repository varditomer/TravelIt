import { Component, Input, OnInit } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';



@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent {

  @Input() travels!: Travel[] | null

}
