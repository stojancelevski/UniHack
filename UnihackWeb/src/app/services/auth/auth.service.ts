import { Injectable } from '@angular/core';
import { Hospital } from '../../models/Hospital';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: Hospital;

  constructor(public auth: AngularFireAuth) {
  }

  getUser() {
    return this.loggedUser;
  }

  setUser(user) {
    this.loggedUser = user;
  }

  // Sign in with email/password
  SignIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result.user.uid);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  updateUser(email, password, newEmail) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
        resolve(userCredential.user.updateEmail(newEmail));
      });
    });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result.user.uid);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

}
