import { Injectable } from '@angular/core'; //Zur Nutzung in anderen Komponenten
import { BehaviorSubject } from 'rxjs';
import { Event } from './models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSubject = new BehaviorSubject<Event | null>(null);
  event$ = this.eventSubject.asObservable();

  setEvent(event: Event) {
    this.eventSubject.next(event);  // gibt Event an alle Abonnenten weiter
  }

  clearEvent() {
    this.eventSubject.next(null);   // setzt eventSubject auf null -> alle Abonnenten werden benachrichtigt, dass kein Event mehr vorhanden ist
  }
}
export { Event };

