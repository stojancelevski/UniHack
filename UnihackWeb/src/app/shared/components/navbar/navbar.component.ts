import { Component, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SimpleEventComponent } from '../../../pages/events/simple-event/simple-event.component';
import { UrgentEventComponent } from '../../../pages/events/urgent-event/urgent-event.component';

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

  openDialogOne(): void {
    this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
    });
  }

  openDialogTwo(): void {
    this.dialog.open(SimpleEventComponent, {
      width: '500px',
    });
  }

  openDialogThree(): void {
    this.dialog.open(UrgentEventComponent, {
      width: '500px',
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
              private snackBar: SnackbarService,
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
          this.snackBar.openSnackBar('Succesfully added Supply', 'Success');
          this.dialogRef.close();
        }).catch(() => {
          this.snackBar.openSnackBar('Failed to Create', 'Error');
        });
      }).catch(() => {
        this.snackBar.openSnackBar('Failed to Create', 'Error');
      });
    } else {
      this.snackBar.openSnackBar('Form not valid', 'Error');
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
