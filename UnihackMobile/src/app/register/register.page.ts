import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { User } from '../shared/user'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  pass: string;
  name: string;
  bloodType: string;
  lastDonation: string;
  address: string;
  phoneNumber: string;
  createUser: boolean = false;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.loadingCtrl.create
  }

  getExtraInfo() {
    this.createUser = true;
  }

  async registerUser() {
    this.authService.signupUser(this.email, this.pass).then((resp) => {
      let user = {
        "email": resp.user.email,
        "uid": resp.user.uid,
        "bloodType": this.bloodType,
        "lastDonation": "",
        "address": this.address,
        "phoneNumber": this.phoneNumber,
        "name": this.name
      }
      console.log(user)
      this.db.createUser(user)
    })
  }

  async loginUser() {
    this.authService.loginUser(this.email, this.pass).then((resp) => {
      console.log(resp)
    })
  }
}
