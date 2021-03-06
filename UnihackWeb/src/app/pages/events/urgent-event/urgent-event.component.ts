import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { BloodValues } from '../../../models/BloodValues';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-urgent-event',
  templateUrl: './urgent-event.component.html',
  styleUrls: ['./urgent-event.component.scss']
})
export class UrgentEventComponent implements OnInit {
  public minDate: Date = new Date();
  public maxDate: Date = new Date('05/27/2030 11:00 AM');
  public dateValue: Date = new Date('05/16/2017 5:00 AM');
  eventForm: FormGroup;
  bloodValues: BloodValues[] = new Array(0);

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              public dialogRef: MatDialogRef<UrgentEventComponent>,
              private snackBar: SnackbarService,
              private fireService: FirebaseService) {
  }

  ngOnInit(): void {
    this.bloodValues.push({bloodType: 'A', rhValue: '-'});
    this.bloodValues.push({bloodType: 'A', rhValue: '+'});
    this.bloodValues.push({bloodType: 'B', rhValue: '-'});
    this.bloodValues.push({bloodType: 'B', rhValue: '+'});
    this.bloodValues.push({bloodType: 'AB', rhValue: '-'});
    this.bloodValues.push({bloodType: 'AB', rhValue: '+'});
    this.bloodValues.push({bloodType: '0', rhValue: '-'});
    this.bloodValues.push({bloodType: '0', rhValue: '+'});

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      bloodType: ['', Validators.required]
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
      this.fireService.createEvent(this.eventForm.value).then(() => {
        this.router.navigateByUrl('/home').then(() => {
          this.snackBar.openSnackBar('Successfully Created', 'Success');
          this.dialogRef.close();
        });
      }).catch(() => {
        this.snackBar.openSnackBar('Failed to create', 'Error');
      });
    } else {
      this.snackBar.openSnackBar('Form not valid', 'Error');
    }
  }
}
