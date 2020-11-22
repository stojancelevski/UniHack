import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Hospital } from '../../../models/Hospital';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: SnackbarService,
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
    if ( this.loginForm.valid ) {
      this.authService.SignIn(this.form.email.value, this.form.password.value).then(value => {
        this.getCurrentUser(value).then(hospital => {
          this.authService.setUser(hospital);
          window.localStorage.setItem('user', hospital.uid);
          this.router.navigateByUrl('/home').then(() => {
            this.snackBar.openSnackBar('Success Log In', 'Success');
          });
        }).catch(() => {
          this.snackBar.openSnackBar('Problems getting user', 'Error');
        });
      }).catch(error => {
        this.snackBar.openSnackBar('Email or password is invalid, please try again', 'Error');
        console.log(error);
      });
    } else {
      this.snackBar.openSnackBar('Form not valid', 'Error');
    }
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

