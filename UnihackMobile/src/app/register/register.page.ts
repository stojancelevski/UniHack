import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  pass: string;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadingCtrl.create
  }

  async registerUser() {
    this.authService.signupUser(this.email, this.pass).then( (resp) => {
      resp.user.ui
    })
  }
}
