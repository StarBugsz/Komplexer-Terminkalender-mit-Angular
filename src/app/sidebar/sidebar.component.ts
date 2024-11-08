import {
  Component,
  inject,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModaldialogComponent } from '../modaldialog/modaldialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DatesService } from '../dates.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  selected: Date | null | undefined;

  readonly dialog = inject(MatDialog);

  @Output() DatepickerDate = new EventEmitter<Date>();

  constructor(private dateSharedService: DatesService) {}

  ngOnInit(): void {
    // Abonniere den DateSharedService, um Änderungen des Monats zu überwachen
    this.dateSharedService.selectedDate$.subscribe((date) => {
      this.selected = date;  // aktualisiert das ausgewählte Datum
    });
  }

  createEvent() {
    this.dialog.open(ModaldialogComponent);
  }

  selectDatepickerDate(newDate: Date) {
    this.DatepickerDate.emit(newDate);
  }
}
