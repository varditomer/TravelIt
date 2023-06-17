import { Injectable } from '@angular/core';
import { Country, Travel, SortBy } from '../models/travel.model';
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
  private _TRAVELS_STORAGE_KEY = 'travels'
  private _SORT_BY_STORAGE_KEY = 'sortBy'

  private _travelsDB: Travel[] = this.storageService.loadFromStorage(this._TRAVELS_STORAGE_KEY) as Travel[] || [];
  private _sortBy: SortBy = this.storageService.loadFromStorage(this._SORT_BY_STORAGE_KEY) as SortBy || null

  private _travels$ = new BehaviorSubject<Travel[]>(this._travelsDB) // travel collection mutable initially sends the current travelsDB
  public travels$ = this._travels$.asObservable() // travels collection read-only

  private _sortBy$ = new BehaviorSubject<SortBy>(this._sortBy) // travel collection mutable initially sends the current travelsDB
  public sortBy$ = this._sortBy$.asObservable() // travels collection read-only

  public getEmptyTravel = () => ({
    _id: this.utilService.makeId(),
    country: '',
    start_date: null,
    end_date: null,
    notes: '',
    flag: ''
  } as Travel)

  public add(newTravel: Travel) {
    this._travelsDB.unshift(newTravel)
    this._travels$.next([...this._travelsDB])
    this.storageService.saveToStorage(this._TRAVELS_STORAGE_KEY, this._travelsDB)
  }

  public remove(travelToRemove: Travel) {
    this._travelsDB = this._travelsDB.filter(travel => travel._id !== travelToRemove._id)
    this._travels$.next([...this._travelsDB])
    this.storageService.saveToStorage(this._TRAVELS_STORAGE_KEY, this._travelsDB)
  }

  public sortTableBy(sortBy: SortBy) {
    console.log(`sortBy.column:`, sortBy.column)
    switch (sortBy.column) {
      case 'country':
        this._travelsDB.sort((a, b) => {
          if (sortBy.ascending) {
            return a.country.localeCompare(b.country)
          } else {
            return b.country.localeCompare(a.country)
          }
        })
        break;
      case 'start_date':
      case 'end_date':
        const cName: 'start_date' | 'end_date' = sortBy.column
        this._travelsDB.sort((a, b) => {
          const dateA: Date = new Date(a[cName]!)
          const dateB: Date = new Date(b[cName]!)
          if (sortBy.ascending) {
            return dateA.getTime() - dateB.getTime()
          } else {
            return dateB.getTime() - dateA.getTime()
          }
        });
        break;

      default:
        break;
    }
    this._travels$.next([...this._travelsDB])
    this.storageService.saveToStorage(this._TRAVELS_STORAGE_KEY, this._travelsDB)
    this._sortBy$.next(sortBy)
    this.storageService.saveToStorage(this._SORT_BY_STORAGE_KEY, this._sortBy)
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
