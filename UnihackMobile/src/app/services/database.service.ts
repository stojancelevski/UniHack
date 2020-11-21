import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../shared/event';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  eventsRef: AngularFireList<any> = null;
  eventsURL = '/events';
  eventByUid = null;

  userRef: AngularFireList<any> = null;
  userURL = '/users';
  userById = null;

  constructor(private fire: AngularFireDatabase) {
    this.eventsRef = fire.list(this.eventsURL);
    this.eventByUid = fire.database.ref(this.eventsURL);
  }

  createUser(value): Promise<boolean> {
    return new Promise((resolve) => {
      this.userRef.push(value);
      resolve(true);
    });
  }

  getEvents() {
    return this.eventsRef;
  }

  public getEventsList(): Observable<Event[]> {
    return this.getEvents().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  get(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list('/hospitals', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  getUserBy(uid: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.fire.list('/hospitals', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges().subscribe(value => {
        resolve(value[0]);
      });
    });
  }

  updateUser(key: string, value: any) {
    return this.userRef.update(key, value);
  }
}
