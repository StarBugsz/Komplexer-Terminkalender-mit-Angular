import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addHours } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: addHours(new Date(), 1),
      title: 'An event'
    }
  ];
}
