import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputComponent } from './components/input/input.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateComponent } from './components/translate/translate.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { InputMaterialComponent } from './components/input-material/input-material.component';
import { TextareaMaterialComponent } from './components/textarea-material/textarea-material.component';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavbarComponent,
    InputComponent,
    TranslateComponent,
    ButtonComponent,
    InputMaterialComponent,
    TextareaMaterialComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatDatepickerModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    NavbarComponent,
    InputComponent,
    TranslateModule,
    TranslateComponent,
    ButtonComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    InputMaterialComponent,
    TextareaMaterialComponent,
    MatCardModule,
    CardComponent,
    MatGridListModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA

  ]
})
export class SharedModule {
}
