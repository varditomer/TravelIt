import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';

@Component({
  selector: 'app-traveling-preview',
  templateUrl: './traveling-preview.component.html',
  styleUrls: ['./traveling-preview.component.scss']
})
export class TravelingPreviewComponent {

  @Input() travel!: Travel
  @Output() onRemove = new EventEmitter<Travel>()

  onRemoveTravel = () => this.onRemove.emit(this.travel)

}
