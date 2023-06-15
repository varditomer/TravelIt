import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/models/travel.model';

@Component({
  selector: 'app-countries-modal',
  templateUrl: './countries-modal.component.html',
  styleUrls: ['./countries-modal.component.scss']
})
export class CountriesModalComponent {

  @Input() countries!: Country[]
  @Output() onSelect = new EventEmitter<Country>()

  onSelectCountry(selectedCountry: Country) {
    this.onSelect.emit(selectedCountry)
  }

}
