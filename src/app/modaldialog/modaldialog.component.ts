import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Event } from '../models/event';
import { EventService } from '../event.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modaldialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modaldialog.component.html',
  styleUrl: './modaldialog.component.css',
})
export class ModaldialogComponent {
  value = '';
  modaldialogOpened = true;
  title = 'my-timepicker-app';

  events: Event[] = [];
  eventname: string = '';
  date: Date = new Date(); 
  startTime: string = '';
  endTime: string = '';
  titleFormControl = new FormControl('', Validators.required);
  dateFormControl = new FormControl('', Validators.required);
  startTimeFormControl = new FormControl('', Validators.required);
  endTimeFormControl = new FormControl('', Validators.required);

  //Steuerung des Dialogs von innen mit Constructor
  constructor(
    public dialogRef: MatDialogRef<ModaldialogComponent>,
    private eventService: EventService // EventService hinzufügen
  ) {} //Referenz auf geöffneten Dialog

  error = false; // Instanz zum Anzeigen, dass nicht alle Felder ausgefüllt sind
  //neuen Termin erstellen
  createEvent() {
    this.error = false;
    //Prüfe ob Eingabefelder nicht leer sind
    if (
      this.titleFormControl.invalid ||
      this.eventname.trim() === '' || 
      this.dateFormControl.invalid ||
      this.startTimeFormControl.invalid ||
      this.startTime.trim() === '' ||
      this.endTimeFormControl.invalid ||
      this.endTime.trim() === ''
    ) {
      this.startTimeFormControl.markAsTouched();
      this.endTimeFormControl.markAsTouched();
      this.error = true;
      return;
    } else {
      let newEvent: Event = {
        id: Math.floor(Math.random() * 10000),
        title: this.eventname,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
      }; 
      this.eventService.setEvent(newEvent);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
