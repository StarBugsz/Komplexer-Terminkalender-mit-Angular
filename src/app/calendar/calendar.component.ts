import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Event, EventService } from '../event.service';
import { Subject } from 'rxjs';
import {
  subDays,
  addDays,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
} from 'date-fns';
import { DatesService } from '../dates.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe], // DatePipe hier bereitstellen
})
export class CalendarComponent {
  @Input() view: string = '';
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];

  event: Event | null = null;
  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private datesService: DatesService
  ) {}

  ngOnInit() {
    // Abonnieren der event$ Observable des EventService
    this.eventService.event$.subscribe((event) => {
      this.event = event;
      if (event) {
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
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    };
    this.events = [...this.events, calendarEvent];
  }

  // rendert Kalender neu, wenn sich was an Ereigniszeiten aendert
  refresh = new Subject<void>();

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

  //aktualisiert Ansicht nach Verschieben
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  previous() {
    if (this.view === 'day') {
      this.viewDate = subDays(this.viewDate, 1);
    } else if (this.view === 'week') {
      this.viewDate = subWeeks(this.viewDate, 1);
    } else if (this.view === 'month') {
      this.viewDate = subMonths(this.viewDate, 1);
    }
    this.cdr.detectChanges(); // Manuelles Auslösen der Änderungserkennung
  }

  next() {
    if (this.view === 'day') {
      this.viewDate = addDays(this.viewDate, 1);
    } else if (this.view === 'week') {
      this.viewDate = addWeeks(this.viewDate, 1);
    } else if (this.view === 'month') {
      this.viewDate = addMonths(this.viewDate, 1);
    }
    this.cdr.detectChanges(); // Manuelles Auslösen der Änderungserkennung
  }

  jumptotoday() {
    this.viewDate = new Date();
    this.cdr.detectChanges();
  }

  // Diese Methode wird aufgerufen, wenn die Ansicht geändert wird
  dateChange(event: any): void {
    // Extrahiert die Liste der Tage der jeweiligen Woche
    const daysInWeek = event.header;

    // Nimm den mittleren Tag der Liste
    const middleIndex = Math.floor(daysInWeek.length / 2);
    const middleDay = daysInWeek[middleIndex].date;

    // Extrahiere den Monat des mittleren Tages der Liste
    const currentMonth = middleDay.getMonth() + 1;
    const startDate = event.period.start;
    let currentYear = startDate.getFullYear();
    if (
      currentMonth === 1 &&
      event.period.start.getMonth() !== event.period.end.getMonth()
    ) {
      currentYear = startDate.getFullYear() + 1;
    }
    console.log(event.period.start.getMonth()+"s"+ event.period.end.getMonth());
    // Den Service verwenden, um den aktuellen Monat zu setzen
    this.datesService.setCurrentMonth(currentMonth, currentYear);
    this.datesService.updateSelectedDate(startDate);
  }
}
