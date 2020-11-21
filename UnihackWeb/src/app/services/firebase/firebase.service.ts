import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/Hospital';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  hospitalsRef: AngularFireList<any> = null;
  hospitalUrl = '/hospitals';
  hospitalById = null;

  constructor(private fire: AngularFireDatabase) {
    this.hospitalsRef = fire.list(this.hospitalUrl);
    this.hospitalById = fire.database.ref(this.hospitalUrl);
  }

  createUser(value): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.hospitalsRef.push(value);
      resolve(true);
    });
  }

  getHospitals() {
    return this.hospitalsRef;
  }

  getHospitalById(key){
    return new Promise((resolve, reject) => {
      this.hospitalById.child(key).once('value', snapshot => {
        resolve(snapshot.val());
      });
    });
  }


  getHospitalsList(): Observable<Hospital[]> {
    return this.getHospitals().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateHospital(key: string, value: any) {
    return this.hospitalsRef.update(key, value);
  }

  deleteHospital(key: string): Promise<any> {
    return this.hospitalsRef.remove(key);
  }
}
