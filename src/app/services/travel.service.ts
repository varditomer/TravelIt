import { Injectable } from '@angular/core';
import { Travel } from '../models/travel.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor() { }

  // Mock the database
  private _travelsDB: Travel[] = [
    { _id: 't101', country: 'Israel', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/il.svg' },
    { _id: 't102', country: 'Spain', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/es.svg' },
    { _id: 't103', country: 'Brazil', start_date: new Date('2023-06-14'), end_date: new Date('2023-06-20'), notes: '', flag: 'https://flagcdn.com/br.svg' },
  ];

  private _travels$ = new BehaviorSubject<Travel[]>(this._travelsDB) // travel collection mutable initially sends the current travelsDB
  public travels$ = this._travels$.asObservable() // travels collection read-only

  // public query() {
  //   this._travels$.next(this._travelsDB)
  // }
}
