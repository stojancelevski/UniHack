import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SimpleEventComponent } from './events/simple-event/simple-event.component';
import { UrgentEventComponent } from './events/urgent-event/urgent-event.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMatDateAdapter, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatSelectModule } from '@angular/material/select';
import { FindADonorComponent } from './find-adonor/find-adonor.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'simple-event', component: SimpleEventComponent},
  {path: 'urgent-event', component: UrgentEventComponent},
  {path: 'supplies', component: SuppliesComponent},
];

@NgModule({
  declarations: [
    AboutComponent,
    SimpleEventComponent,
    UrgentEventComponent,
    SuppliesComponent,
    FindADonorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxMatTimepickerModule,
    DateTimePickerModule,
    MatSelectModule,
  ],
  providers: [
    // @ts-ignore
    NgxMatDateAdapter
  ]
})
export class PagesModule {
}
