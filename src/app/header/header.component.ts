import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectorRef,
  NgModule,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatesService } from '../dates.service';
import { CommonModule } from '@angular/common';

interface TimePeriod {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  selectedValue: string = 'month';
  isSidebarVisible = true;
  timePeriods: TimePeriod[] = [
    { value: 'day', viewValue: 'Tag' },
    { value: 'week', viewValue: 'Woche' },
    { value: 'month', viewValue: 'Monat' },
  ];

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() changeView = new EventEmitter<string>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() jumptotoday = new EventEmitter<void>();

  constructor(
    private datesService: DatesService,
    private cdr: ChangeDetectorRef
  ) {}

  currentMonth!: number;
  currentYear!: number;
  currentDay!: string;
  currentMonthasString!: string;
  monthNames: { [key: number]: string } = {
    1: 'Januar',
    2: 'Februar',
    3: 'März',
    4: 'April',
    5: 'Mai',
    6: 'Juni',
    7: 'Juli',
    8: 'August',
    9: 'September',
    10: 'Oktober',
    11: 'November',
    12: 'Dezember',
  };

  getMonthName(month: number): string {
    return this.monthNames[month] || 'Unbekannter Monat';
  }

  formatCurrentDay() {}

  ngOnInit(): void {
    // Abonnieren der Änderungen im datesService
    this.datesService.currentMonth$.subscribe((data) => {
      if (data) {
        this.currentYear = data.year;
        this.currentMonthasString = this.getMonthName(data.month);
      }
      this.cdr.detectChanges();
    });
    this.datesService.selectedDate$.subscribe((data) => {
      const day = data.getDate().toString();
      const month = (data.getMonth() + 1).toString();
      let year;
      if (month === '1') {
        year = (data.getFullYear()).toString(); // Nächstes Jahr, wenn Monat Januar
      } else {
        year = data.getFullYear().toString(); // Aktuelles Jahr für alle anderen Monate
      }
      this.currentDay = `${day}.${month}.${year}`;
      this.cdr.detectChanges();
    });
  }

  ToggleSidebar() {
    this.toggleSidebar.emit();
  }

  SetView() {
    this.changeView.emit(this.selectedValue);
  }

  previousDate() {
    this.previous.emit();
  }

  nextDate() {
    this.next.emit(); // Event an Elternkomponente senden
  }

  todaysDate() {
    this.jumptotoday.emit();
  }
}
