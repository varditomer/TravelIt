import { Injectable } from '@angular/core';
import { Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveToStorage(key: string, value: Travel[]) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public loadFromStorage(key: string): Travel[] | undefined {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) as Travel[] : undefined;
  }
}
