import { Component, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() uid: string;

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, public fireService: FirebaseService) {
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.loggedUser = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',

    });
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialogoverview.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog implements OnInit {

  createSupplyForm: FormGroup;
  createSupplyToHospitalForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              private fb: FormBuilder,
              public fireService: FirebaseService,
              private router: Router,
              private authService: AuthService) {
  }

  create() {
    if ( this.createSupplyForm.valid ) {
      this.fireService.createSupply(this.createSupplyForm.value).then(value => {
        this.createSupplyToHospitalForm.patchValue({
          hospitalKey: this.authService.loggedUser.uid,
          supplyKey: value
        });
        this.fireService.createSupplyToHospital(this.createSupplyToHospitalForm.value).then(() => {
          this.router.navigateByUrl('/home');
          this.dialogRef.close();
        });
      });
    } else {
      console.log('Form not valid');
    }
  }


  ngOnInit(): void {
    this.createSupplyForm = this.fb.group({
      bloodType: ['', Validators.required],
      rhValue: ['', [Validators.required, Validators.maxLength(1)]],
      quantity: ['', [Validators.required]]
    });
    this.createSupplyToHospitalForm = this.fb.group({
      hospitalKey: [''],
      supplyKey: ['']
    });
  }

}
