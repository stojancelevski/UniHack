import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Location } from '../../../models/Location';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

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
              private snackBar: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.hospitalCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      hospitalName: ['', Validators.required],
      uid: ['']
    });
  }

  get formAddress() {
    return this.addressForm.controls;
  }

  get hospitalForm() {
    return this.hospitalCreateForm.controls;
  }

  submitForm() {
    if ( this.hospitalCreateForm.valid ) {
      this.authService.SignUp(this.hospitalForm.email.value, this.hospitalForm.password.value).then(userUid => {
        this.hospitalCreateForm.patchValue({
          uid: userUid
        });
        this.hospitalCreateForm.removeControl('password');
        this.fireService.createUser(this.hospitalCreateForm.value).then(value => {
          this.router.navigateByUrl('/login').then(() => {
            this.snackBar.openSnackBar('Thank you for registering', 'Success');
          });
        }).catch(() => {
          this.snackBar.openSnackBar('Problems with registration, try again', 'Error');
        });
      }).catch((error) => {
        this.snackBar.openSnackBar(error, 'Error');
      });
    } else {
      this.snackBar.openSnackBar('Form not valid', 'Error');
    }

  }

}
