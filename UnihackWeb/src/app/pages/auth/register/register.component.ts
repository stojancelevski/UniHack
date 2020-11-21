import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Location } from '../../../models/Location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hospitalCreateForm: FormGroup;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private fireService: FirebaseService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group(({
      city: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
      zipCode: ['', Validators.required],
      street: ['', Validators.required]
    }));

    this.hospitalCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      hospitalName: ['', Validators.required],
      uid: ['', Validators.required]
    });
  }

  get formAddress() {
    return this.addressForm.controls;
  }

  get hospitalForm() {
    return this.hospitalCreateForm.controls;
  }

  createAddress(): Location {
    return {
      city: this.formAddress.city.value,
      country: this.formAddress.country.value,
      number: this.formAddress.number.value,
      zipCode: this.formAddress.zipCode.value,
      street: this.formAddress.street.value
    };
  }

  submitForm() {
    this.hospitalCreateForm.patchValue({
      address: this.createAddress()
    });
    this.authService.SignUp(this.hospitalForm.email.value, this.hospitalForm.password.value).then(userUid => {
      this.hospitalCreateForm.patchValue({
        uid: userUid
      });
      this.hospitalCreateForm.removeControl('email');
      this.hospitalCreateForm.removeControl('password');
      this.fireService.createUser(this.hospitalCreateForm.value).then(value => {
        this.router.navigateByUrl('/login').then(() => {
          console.log(value);
        });
      });
    });
  }

}
