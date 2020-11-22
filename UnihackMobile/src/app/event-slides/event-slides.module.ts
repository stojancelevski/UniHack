import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventSlidesComponent } from './event-slides.component';
import { HereMapModule } from '../here-map/here-map.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, HereMapModule],
  declarations: [EventSlidesComponent],
  exports: [EventSlidesComponent]
})
export class EventSlidesModule {}
