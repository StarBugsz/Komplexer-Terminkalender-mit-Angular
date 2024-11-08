import { Component, Input, ViewChild } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Calendar';

  view: string = 'month';
  viewDate: Date = new Date();
  events = [];
  isSidebarVisible = true;
  @ViewChild(CalendarComponent) calendar!: CalendarComponent;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  changeView1(view: string) {
    this.view = view;
  }

  SentPreviousDate() {
    this.calendar.previous();
  }

  SentNextDate() {
    this.calendar.next();
  }

  todaysDate() {
    this.calendar.jumptotoday();
  }

  selectDatepickerDate(newDate: Date): void {
    this.viewDate = newDate;
  }
}
