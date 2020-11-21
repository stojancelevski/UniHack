import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/Hospital';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Event } from '../../models/Event';

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

  urgentEventsRef: AngularFireList<any> = null;
  urgentEventsUrl = '/events';
  urgentEventsId = null;

  private uploadTask;
  storageTask: any;

  constructor(private fire: AngularFireDatabase, private readonly storage: AngularFireStorage) {
    this.hospitalsRef = fire.list(this.hospitalUrl);
    this.hospitalById = fire.database.ref(this.hospitalUrl);
    this.urgentEventsRef = fire.list(this.urgentEventsUrl);
    this.urgentEventsId = fire.database.ref(this.urgentEventsUrl);
    this.eventsRef = fire.list(this.eventsUrl);
    this.eventsById = fire.database.ref(this.eventsUrl);
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
      this.fire.list('/hospitals', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
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

  createEvent(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.eventsRef.push(value);
      resolve(true);
    });
  }

  getEvents() {
    return this.eventsRef;
  }

  getEventsById(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list('/events', ref => ref.orderByChild('key').equalTo(uid)).valueChanges().subscribe(value => {
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

  createUrgentEvent(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.urgentEventsRef.push(value);
      resolve(true);
    });
  }

  getUrgentEvents() {
    return this.urgentEventsRef;
  }

  getUrgentEventsById(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list('/urgentEvents', ref => ref.orderByChild('key').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getUrgentEventsList(): Observable<Event[]> {
    return this.getEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateUrgentEvent(key: string, value: any) {
    return this.urgentEventsRef.update(key, value);
  }

  deleteUrgentEvent(key: string): Promise<any> {
    return this.urgentEventsRef.remove(key);
  }

}
