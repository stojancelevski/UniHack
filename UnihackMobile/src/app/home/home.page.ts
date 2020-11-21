import { Component } from '@angular/core';
import { Event, BloodType } from '../shared/event';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events: Observable<Event[]>

  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    this.events = this.db.getEventsList();
    console.log(this.events)
  }
}
