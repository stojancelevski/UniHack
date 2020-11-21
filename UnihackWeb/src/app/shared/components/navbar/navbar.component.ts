import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() uid: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.loggedUser = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
