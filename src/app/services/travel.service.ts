import { Injectable } from '@angular/core';
import { Travel } from '../models/travel.model';
import { BehaviorSubject, catchError, map, retry, tap, throwError } from 'rxjs';
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
    { _id: 't101', country: 'Israel', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/il.svg' },
    { _id: 't102', country: 'Spain', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/es.svg' },
    { _id: 't103', country: 'Brazil', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/br.svg' },
  ];

  private _travels$ = new BehaviorSubject<Travel[]>(this._travelsDB) // travel collection mutable initially sends the current travelsDB
  public travels$ = this._travels$.asObservable() // travels collection read-only

  public getEmptyTravel = () => ({
    _id: this.utilService.makeId,
    country: '',
    start_date: new Date('2023-06-14'),
    end_date: new Date('2023-06-20'),
    notes: '',
    flag: ''
  })


  public getCountries(countryName: string) {
    console.log(`blaaaa:`,)
    console.log(`countryNames:`, countryName)
    return this.http.get<any>(`https://restcountries.com/v3.1/name/${countryName}`)
      .pipe(
        map(res => res),
        tap((res) => console.log(`res:`, res)),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err:', err)
          return throwError(() => err)
        })
      )
  }


  bla = this.getCountries('Israel')

}
