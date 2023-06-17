import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from 'src/app/models/travel.model';
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

  onAddTravel(addTravelForm: NgForm) {
    const travelToAdd = {...this.travel}
    this.travelService.add(travelToAdd)
    addTravelForm.reset()
    this.travel = this.travelService.getEmptyTravel()
  }

  selectCountry(country: Country) {
    this.isCountryModalOpen = false
    this.travel.country = country.name
    this.travel.flag = country.flag
  }

  unselectCountry(ev: MouseEvent | TouchEvent) {
    ev.preventDefault()
    this.travel.country = ''
    this.travel.flag = ''
  }

}
