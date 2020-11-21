import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'web';
  uid: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');

  }

  ngOnInit(): void {
    this.uid = localStorage.getItem('user');
  }

  ngDoCheck(): void {
    this.uid = localStorage.getItem('user');
  }
}
