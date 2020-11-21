import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Hospital } from '../../../models/Hospital';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private fireService: FirebaseService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.authService.SignIn(this.form.email.value, this.form.password.value).then(value => {
      this.getCurrentUser(value.user.uid).then(hospital => {
        this.authService.setUser(hospital);
        window.localStorage.setItem('user', hospital.uid);
        this.router.navigateByUrl('/home').then(() => {
          console.log('success');
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }

  private getCurrentUser(uid: string): Promise<Hospital> {
    return new Promise<Hospital>((resolve, reject) => {
      this.fireService.getHospitalById(uid).then(hospital => {
        // @ts-ignore
        resolve(hospital);
      }).catch(error => {
        console.log(error);
        reject(true);
      });
    });
  }
}
