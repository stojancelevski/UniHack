import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '../../../models/Location';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Hospital } from '../../../models/Hospital';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private fireService: FirebaseService) {
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
        console.log(hospital);
      });
    });
  }

  private getCurrentUser(key: string): Promise<Hospital> {
    return new Promise<Hospital>((resolve, reject) => {
      this.fireService.getHospitalById(key).then(hospital => {
        console.log(hospital);
        // @ts-ignore
        resolve(hospital);
      });
    });
  }
}
