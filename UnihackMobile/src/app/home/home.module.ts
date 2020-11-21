import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { EventComponentModule } from '../event/event.module';
import { EventSlidesModule } from '../event-slides/event-slides.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventComponentModule,
    EventSlidesModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
