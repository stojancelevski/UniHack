import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Event } from '../../models/Event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Observable<Event[]>;

  constructor(private authService: AuthService, private router: Router, private fireService: FirebaseService) {
  }

  ngOnInit(): void {
    this.events = this.fireService.getEventsList();
  }

  logOut() {
    this.authService.loggedUser = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
