import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../services/data.service';

@Component({
  selector: 'app-event-slides',
  templateUrl: './event-slides.component.html',
  styleUrls: ['./event-slides.component.scss'],
})
export class EventSlidesComponent implements OnInit {
  @Input() event: Event;

  constructor() { }

  ngOnInit() {}

}
