import { Injectable } from '@angular/core';
import { Country, Travel } from '../models/travel.model';
import { BehaviorSubject, catchError, map, retry, filter, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilService } from './util.service';



@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  // Mock the database
  private _travelsDB: Travel[] = [
    // { _id: 't101', country: 'Israel', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/il.svg' },
    // { _id: 't102', country: 'Spain', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/es.svg' },
    // { _id: 't103', country: 'Brazil', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/br.svg' },
  ];

  private _travels$ = new BehaviorSubject<Travel[]>(this._travelsDB) // travel collection mutable initially sends the current travelsDB
  public travels$ = this._travels$.asObservable() // travels collection read-only

  public getEmptyTravel = () => ({
    _id: this.utilService.makeId(),
    country: '',
    start_date: null,
    end_date: null,
    notes: '',
    flag: ''
  } as Travel)

  public addTravel(newTravel: Travel) {
    this._travelsDB.push(newTravel)
    this._travels$.next([...this._travelsDB])
    return of(newTravel)
  }


  public getCountries(countryName: string) {
    return this.http.get<any>(`https://restcountries.com/v3.1/name/${countryName}`)
      .pipe(
        map(res => res.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.svg
        }))),
        map((countries: Country[]) => countries.filter((country: Country) => {
          // Example: user's input: 'uni'
          // United Arab Emirates
          const names = country.name.split(' ')
          // ['United', 'Arab', 'Emirates']
          const startingNames = names.filter((name: string) => name.toLowerCase().startsWith(countryName.toLowerCase()))
          // return only country's names that start with user's input -> startingNames = ['United']
          return startingNames.length > 0
          // return only countries that have at least one name that starts with user's input -> United Arab Emirates will be include
          // could easily replace with regex that will do the same -> just for clarifying 
        })),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      )
  }

}
