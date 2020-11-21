import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Supplies } from '../../models/Supplies';
import { SuppliesToHospital } from '../../models/SuppliesToHospital';
import { AuthService } from '../../services/auth/auth.service';
import { rejects } from 'assert';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  supplies: Supplies[];
  suppliesToHospital: SuppliesToHospital[];
  displayedColumns: string[] = ['bloodType', 'rhValue', 'quantity'];
  dataSource: Supplies[] = new Array(0);

  constructor(private fireService: FirebaseService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fireService.getSuppliesToHospitalList().subscribe(value => {
      this.suppliesToHospital = value.filter(val => val.hospitalKey === this.authService.loggedUser.uid);
      this.getSupplies(this.suppliesToHospital).then(result => {
        this.dataSource = result;
      });
    });
  }

  public getSupplies(sth: SuppliesToHospital[]): Promise<Supplies[]> {
    return new Promise<Supplies[]>((resolve, reject) => {
      const supplies = new Array(0);
      sth.forEach(c => {
        this.fireService.getSuppliesById(c.supplyKey).then(supply => {
          supplies.push(supply);
        });
      });
      resolve(supplies);
    });
  }

  edit() {

  }

  delete() {

  }
}
