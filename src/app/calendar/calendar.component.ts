import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Event, EventService } from '../event.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Input() view: string = '';
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];

  event: Event | null = null;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Abonnieren der event$ Observable des EventService
    this.eventService.event$.subscribe((event) => {
      this.event = event;
      if (event) {
        //console.log(event.startTime);
        // Hier kannst du weitere Logik ausführen oder das Event verwenden
        this.addEventToCalendar(event);
      }
    });
  }

  addEventToCalendar(event: Event) {
    // Datum und Zeit in ISO String darstellen
    let dateString = event.date.toLocaleDateString('en-CA');
    let starttimetoISO = this.formatDateTime(event.startTime).substring(0, 5);
    let endtimetoISO = this.formatDateTime(event.endTime).substring(0, 5);

    let StartDateCombined: string = dateString + 'T' + starttimetoISO;
    let EndDateCombined: string = dateString + 'T' + endtimetoISO;

    //Instanzen erstellen
    const start = new Date(StartDateCombined);
    const end = new Date(EndDateCombined);

    const calendarEvent: CalendarEvent = {
      start: start,
      end: end,
      title: event.title,
    };
    this.events = [...this.events, calendarEvent];
  }

  // Hilfsfunktion fuer Zeitformatierung
  formatDateTime(timeString: string): string {
    // Aufspalten der Zeit in Stunden und Minuten
    let [hours, minutes] = timeString.split(':');

    // 0 am Anfang hinzufuegen
    if (parseInt(hours) < 10) {
      hours = '0' + hours;
    }

    // String wieder zusammenfuegen
    return [hours, minutes].join(':');
  }
}
