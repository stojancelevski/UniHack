import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  {
  @Input() event: Event;


}
