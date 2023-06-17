import { Injectable } from '@angular/core';
import { Country, Travel } from '../models/travel.model';
import { BehaviorSubject, catchError, map, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilService } from './util.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private storageService: LocalStorageService
  ) { }
  private _STORAGE_KEY = 'travels'

  private _travelsDB: Travel[] = this.storageService.loadFromStorage(this._STORAGE_KEY) || [];

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

  public add(newTravel: Travel) {
    this._travelsDB.push(newTravel)
    this._travels$.next([...this._travelsDB])
    this.storageService.saveToStorage(this._STORAGE_KEY, this._travelsDB)
  }

  public remove(travelToRemove: Travel) {
    this._travelsDB = this._travelsDB.filter(travel => travel._id !== travelToRemove._id)
    this._travels$.next([...this._travelsDB])
    this.storageService.saveToStorage(this._STORAGE_KEY, this._travelsDB)
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
