import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-simple-event',
  templateUrl: './simple-event.component.html',
  styleUrls: ['./simple-event.component.scss']
})
export class SimpleEventComponent implements OnInit {
  public minDate: Date = new Date();
  public maxDate: Date = new Date('05/27/2030 11:00 AM');
  public dateValue: Date = new Date('05/16/2017 5:00 AM');
  eventForm: FormGroup;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private snackBar: SnackbarService,
              public dialogRef: MatDialogRef<SimpleEventComponent>,
              private fireService: FirebaseService) {
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  get form() {
    return this.eventForm.controls;
  }

  submitForm() {
    if ( this.eventForm.valid ) {
      this.eventForm.patchValue({
        date: this.datePipe.transform(this.form.date.value, 'medium')
      });
      this.fireService.createEvent(this.eventForm.value).then(value => {
        this.router.navigateByUrl('/home').then(() => {
          this.snackBar.openSnackBar('Successfully Created', 'Success');
          this.dialogRef.close();
        });
      }).catch(() => {
        this.snackBar.openSnackBar('Failed to Create', 'Error');
      });
    } else {
      this.snackBar.openSnackBar('Form not valid', 'Error');
    }
  }

}
