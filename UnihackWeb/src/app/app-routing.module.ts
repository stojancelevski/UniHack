import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './pages/auth/auth.module';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    AuthModule,
    PagesModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
