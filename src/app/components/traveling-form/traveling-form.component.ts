import { Component } from '@angular/core';
import { NgForm, NgModel, ValidationErrors, Validators } from '@angular/forms';
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

  onAddTravel(addTravelForm: NgForm) {
    const travelToAdd = { ...this.travel }
    this.travelService.add(travelToAdd)
    addTravelForm.reset()
    this.travel = this.travelService.getEmptyTravel()
  }

  startDateEndDateValidator(startDate: NgModel, endDate: NgModel): void {
    const validatorFn = (): ValidationErrors | null => {

      const { start_date, end_date } = this.travel

      if (start_date && end_date && start_date > end_date) {
        return { startDateEndDate: true }; // Validation error key
      }
      return null; // No validation error
    }
    // We adding the existing validators of the control with our custom validatorFn using Validators setValidators and composing them to a single validate func.
    if (startDate.control.validator) startDate.control.setValidators(Validators.compose([startDate.control.validator, validatorFn]))
    else startDate.control.setValidators(validatorFn)
    startDate.control.updateValueAndValidity()

    if (endDate.control.validator) endDate.control.setValidators(Validators.compose([endDate.control.validator, validatorFn]))
    else endDate.control.setValidators(validatorFn)
    endDate.control.updateValueAndValidity()
  }

  properlySelectedCountryValidator(addTravelForm: NgForm): void {
    const validatorFn = (): ValidationErrors | null => {
      const { flag } = this.travel
      if (!flag) {
        return { improperlySelectCountry: true } //If user enter a addTravelForm without selecting it in the countries option an obtain it a flag
      }
      return null
    }
    if (addTravelForm.control.validator) addTravelForm.control.setValidators(Validators.compose([addTravelForm.control.validator, validatorFn]))
    else addTravelForm.control.setValidators(validatorFn)
    addTravelForm.control.updateValueAndValidity()
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
