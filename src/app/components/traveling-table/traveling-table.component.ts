import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';



@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent {

  @Input() travels!: Travel[] | null
  @Output() onRemove = new EventEmitter<Travel>()

  onRemoveTravel = (travelToRemove: Travel) => this.onRemove.emit(travelToRemove)

}
