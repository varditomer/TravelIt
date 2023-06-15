import { Component } from '@angular/core';
import { Country, Travel } from 'src/app/models/travel.model';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-traveling-form',
  templateUrl: './traveling-form.component.html',
  styleUrls: ['./traveling-form.component.scss']
})
export class TravelingFormComponent {

  constructor(
    private travelService: TravelService
  ) { }

  travel = this.travelService.getEmptyTravel()
  countries!: Country[]
  isCountryModalOpen = false

  onUserInput(userInput: string) {
    if (!userInput) return this.countries = []
    this.travelService.getCountries(userInput).subscribe(
      (countries) => {
        this.countries = countries
        this.isCountryModalOpen = true
      },
      (error) => this.countries = []
    )
    return
  }

  onAddTravel() {
    console.log(`this.travel:`, this.travel)
  }

  selectCountry(country: Country) {
    this.isCountryModalOpen = false
    console.log(`1:`,)
    console.log(`country:`, country)
  }

}
