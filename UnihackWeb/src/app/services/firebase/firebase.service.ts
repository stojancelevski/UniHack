import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Hospital} from '../../models/Hospital';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Event} from '../../models/Event';
import {SuppliesToHospital} from '../../models/SuppliesToHospital';
import {Supplies} from '../../models/Supplies';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  hospitalsRef: AngularFireList<any> = null;
  hospitalUrl = '/hospitals';
  hospitalById = null;

  eventsRef: AngularFireList<any> = null;
  eventsUrl = '/events';
  eventsById = null;

  suppliesRef: AngularFireList<any> = null;
  suppliesUrl = '/supplies';
  suppliesId = null;

  suppliesToHospitalRef: AngularFireList<any> = null;
  suppliesToHospitalUrl = '/suppliesToHospital';
  suppliesToHospitalId = null;

  usersRef: AngularFireList<any> = null;
  usersUrl = '/users';
  usersId = null;

  constructor(private fire: AngularFireDatabase, private readonly storage: AngularFireStorage) {
    this.hospitalsRef = fire.list(this.hospitalUrl);
    this.hospitalById = fire.database.ref(this.hospitalUrl);
    this.eventsRef = fire.list(this.eventsUrl);
    this.eventsById = fire.database.ref(this.eventsUrl);
    this.suppliesRef = fire.list(this.suppliesUrl);
    this.suppliesId = fire.database.ref(this.suppliesUrl);
    this.suppliesToHospitalId = fire.database.ref(this.suppliesToHospitalUrl);
    this.suppliesToHospitalRef = fire.list(this.suppliesToHospitalUrl);
    this.usersRef = fire.list(this.usersUrl);
    this.usersId = fire.database.ref(this.usersUrl);
  }

  createUser(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.hospitalsRef.push(value);
      resolve(true);
    });
  }

  getHospitals() {
    return this.hospitalsRef;
  }

  getHospitalById(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list(this.hospitalUrl, ref => ref.orderByChild('uid').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getDonorByBloodType(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list(this.usersUrl, ref => ref.orderByChild('bloodType').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value);
      });
    });
  }

  getUsersList(): Observable<Hospital[]> {
    return this.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
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

  createEvent(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.eventsRef.push(value);
      resolve(true);
    });
  }

  getEvents() {
    return this.eventsRef;
  }

  getUsers() {
    return this.usersRef;
  }


  getEventsById(key: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list('/events', ref => ref.orderByKey().equalTo(key)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getEventsList(): Observable<Event[]> {
    return this.getEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateEvent(key: string, value: any) {
    return this.eventsRef.update(key, value);
  }

  deleteEvent(key: string): Promise<any> {
    return this.eventsRef.remove(key);
  }

  createSupply(value): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.suppliesRef.push(value).key);
    });
  }

  getSupplies() {
    return this.suppliesRef;
  }

  getSuppliesById(key: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list(this.suppliesUrl, ref => ref.orderByKey().equalTo(key)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getSuppliesList(): Observable<Supplies[]> {
    return this.getSupplies().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateSupply(key: string, value: any) {
    return this.suppliesRef.update(key, value);
  }

  deleteSupply(key: string): Promise<any> {
    return this.suppliesRef.remove(key);
  }

  createSupplyToHospital(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.suppliesToHospitalRef.push(value);
      resolve(true);
    });
  }

  getSuppliesToHospital() {
    return this.suppliesToHospitalRef;
  }

  getSupplyToHospitalById(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list(this.suppliesToHospitalUrl, ref => ref.orderByChild('hospitalKey').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getSuppliesToHospitalList(): Observable<SuppliesToHospital[]> {
    return this.getSuppliesToHospital().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateSupplyToHospital(key: string, value: any) {
    return this.suppliesToHospitalRef.update(key, value);
  }

  deleteSupplyToHospital(key: string): Promise<any> {
    return this.suppliesToHospitalRef.remove(key);
  }


}
