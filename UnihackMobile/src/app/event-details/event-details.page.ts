import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, BloodType } from '../shared/event';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.page.html',
    styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
    public event: Event;
    public key: string;

    constructor(
        private db: DatabaseService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const key = this.activatedRoute.snapshot.paramMap.get('key');
        this.key = key;
        this.db.getEventDetail(key).then((event) => {
            this.event = event
        })
    }

    getBackButtonText() {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;
        return mode === 'ios' ? 'Inbox' : '';
    }
}
