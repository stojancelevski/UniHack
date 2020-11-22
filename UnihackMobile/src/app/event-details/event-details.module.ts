import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventDetailsPage } from './event-details.page';

import { IonicModule } from '@ionic/angular';
import { HereMapModule } from '../here-map/here-map.module';

import { EventDetailsPageRoutingModule } from './event-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HereMapModule,
    EventDetailsPageRoutingModule
  ],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule {}
