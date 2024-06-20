import { Component, Input, } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addHours } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Input() view: string = '';  
  @Input() viewDate: Date = new Date();
  @Input() events = [];

}
