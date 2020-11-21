import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.authService.loggedUser);
  }

  logOut() {
    this.authService.loggedUser = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
