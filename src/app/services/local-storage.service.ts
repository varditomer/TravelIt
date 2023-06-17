import { Injectable } from '@angular/core';
import { SortBy, Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveToStorage(key: string, value: Travel[] | SortBy) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public loadFromStorage(key: string): Travel[] | SortBy | undefined {
    const data = localStorage.getItem(key)
    if (!data) return undefined
    return key === 'trabel' ? JSON.parse(data) as Travel[] : JSON.parse(data) as SortBy
  }
}
