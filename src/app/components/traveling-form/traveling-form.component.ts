import { Component } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';

@Component({
  selector: 'app-traveling-form',
  templateUrl: './traveling-form.component.html',
  styleUrls: ['./traveling-form.component.scss']
})
export class TravelingFormComponent {

  travel!: this


  onAddTravel() {
    console.log(`add Travel:`, )
  }

}
