import { Component, Input } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';

@Component({
  selector: 'app-traveling-preview',
  templateUrl: './traveling-preview.component.html',
  styleUrls: ['./traveling-preview.component.scss']
})
export class TravelingPreviewComponent {

  @Input() travel!: Travel

}
