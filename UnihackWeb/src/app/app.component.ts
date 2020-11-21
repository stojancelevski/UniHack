import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'web';
  uid: string;

  constructor(private translate: TranslateService, private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem('user');
  }

  ngDoCheck(): void {
    const routerLink = window.location.href.split('/')[3];
    this.uid = localStorage.getItem('user');
    if ( (routerLink === 'login' || routerLink === 'register') && this.uid !== null ) {
      this.router.navigateByUrl('/home');
    }
  }
}
