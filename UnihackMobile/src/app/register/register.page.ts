import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

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
    private loadingCtrl: LoadingController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.loadingCtrl.create
  }

  async registerUser() {
    this.authService.signupUser(this.email, this.pass).then( (resp) => {

    })
  }

  async loginUser() {
    this.authService.loginUser(this.email, this.pass).then( (resp) => {
      console.log(resp)
    })
  }
}
