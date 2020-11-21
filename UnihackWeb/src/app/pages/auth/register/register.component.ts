import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Location } from '../../../models/Location';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hospitalCreateForm: FormGroup;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private fireService: FirebaseService) {
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
      key: ['', Validators.required]
    });
  }

  get formAddress() {
    return this.addressForm.controls;
  }

  get hospitalForm() {
    return this.hospitalCreateForm.controls;
  }

  createAddress(): Location {
    const address: Location = {
      city: this.formAddress.city.value,
      country: this.formAddress.country.value,
      number: this.formAddress.number.value,
      zipCode: this.formAddress.zipCode.value,
      street: this.formAddress.street.value
    };
    return address;
  }

  submitForm() {
    this.hospitalCreateForm.patchValue({
      address: this.createAddress()
    });
    this.authService.SignUp(this.hospitalForm.email.value, this.hospitalForm.password.value).then(userUid => {
      this.hospitalCreateForm.patchValue({
        key: userUid
      });
      this.hospitalCreateForm.removeControl('email');
      this.hospitalCreateForm.removeControl('password');
      this.fireService.createUser(this.hospitalCreateForm.value).then(value => {
        console.log(value);
      });
    });
  }

}
