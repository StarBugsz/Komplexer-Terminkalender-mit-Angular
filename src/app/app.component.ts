import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calendar';

  view: string= "month";  
  viewDate: Date = new Date();
  events = [];
  isSidebarVisible = true;


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  changeView1(view: string) {
    this.view = view;
  }
}
