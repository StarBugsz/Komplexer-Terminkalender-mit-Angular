import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  [x: string]: any;

  // BehaviorSubject, damit immer der letzte Wert verfügbar ist
  private currentMonthSubject = new BehaviorSubject<{
    month: number;
    year: number;
  } | null>(null);
  private selectedDateSource = new BehaviorSubject<Date>(new Date());

  currentMonth$ = this.currentMonthSubject.asObservable();
  selectedDate$ = this.selectedDateSource.asObservable();

  // Methode, um den aktuellen Monat zu setzen
  setCurrentMonth(month: number, year: number): void {
    this.currentMonthSubject.next({ month, year });
  }

  //für datePicker: da weitermachen bzw. neumachen
  updateSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
    
  }

  constructor() {}
}
