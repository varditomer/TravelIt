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
    { _id: 't101', country: 'Israel', start_date: new Date('2023-14-06'), end_date: new Date('2023-20-06'), notes: '', flag: 'https://flagcdn.com/il.svg' },
    { _id: 't102', country: 'Spain', start_date: new Date('2023-14-06'), end_date: new Date('2023-20-06'), notes: '', flag: 'https://flagcdn.com/es.svg' },
    { _id: 't103', country: 'Brazil', start_date: new Date('2023-14-06'), end_date: new Date('2023-20-06'), notes: '', flag: 'https://flagcdn.com/br.svg' },
  ];

  private _travels$ = new BehaviorSubject<Travel[]>([])
  public travels$ = this._travels$.asObservable()

  public query() {
    console.log(`1:`, )
    this._travels$.next(this._travelsDB)
  }
}