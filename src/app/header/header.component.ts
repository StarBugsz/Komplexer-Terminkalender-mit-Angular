import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedValue: string = 'month';
  isSidebarVisible = true;
  timePeriods: TimePeriod[] = [
    { value: 'day', viewValue: 'Tag' },
    { value: 'week', viewValue: 'Woche' },
    { value: 'month', viewValue: 'Monat' },
  ];

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() changeView = new EventEmitter<string>();

  ToggleSidebar() {
    this.toggleSidebar.emit();
  }

  SetView() {
    this.changeView.emit(this.selectedValue);
    console.log(this.selectedValue)
  }
}
