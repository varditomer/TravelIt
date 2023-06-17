import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel, SortBy } from 'src/app/models/travel.model';

@Component({
  selector: 'app-traveling-table',
  templateUrl: './traveling-table.component.html',
  styleUrls: ['./traveling-table.component.scss']
})
export class TravelingTableComponent {

  @Input() travels!: Travel[] | null
  @Input() sortBy!: SortBy | null
  @Output() onRemove = new EventEmitter<Travel>()
  @Output() onSort = new EventEmitter<SortBy>()

  onRemoveTravel = (travelToRemove: Travel) => this.onRemove.emit(travelToRemove)

  onSortBy = (column: string) => {
    let newSortby: SortBy
    if (!this.sortBy) newSortby = {
      column,
      ascending: true
    }
    else {
      if (this.sortBy.column === column) newSortby = {
        column,
        ascending: !this.sortBy.ascending
      }
      else newSortby = {
        column,
        ascending: true
      }
    }
    console.log(`newSortby:`, newSortby)
    this.onSort.emit(newSortby)
  }

}
