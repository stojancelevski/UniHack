import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss']
})
export class DonorsComponent implements OnInit {
  users: any[];
  usersByBlood: any[];
  searchDonors: FormGroup;
  clicked = false;

  constructor(private FireService: FirebaseService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.FireService.getUsersList().subscribe(users => {
      this.users = users;
      console.log(users);
    });

    this.searchDonors = this.fb.group({
      bloodType: ['', [Validators.required]],
    });
  }

  getDonorByBloodType() {
    console.log(this.searchDonors.controls.bloodType.value);
    this.FireService.getDonorByBloodType(this.searchDonors.controls.bloodType.value).then(val => {
      console.log(val);
      this.clicked = true;
      this.usersByBlood = val;
    });
  }

  clear() {
    this.clicked = false;
  }
}
