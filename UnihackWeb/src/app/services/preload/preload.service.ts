import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Hospital } from '../../models/Hospital';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  hospital: Hospital = null;

  constructor(private authService: AuthService, private fireService: FirebaseService, private router: Router) {
  }

  public getHospital(): Hospital {
    return this.hospital;
  }

  load() {
    return new Promise<boolean>((resolve) => {
      const uid = localStorage.getItem('user');
      if ( uid !== null ) {
        this.fireService.getHospitalById(uid).then(hospital => {
          this.hospital = hospital;
          this.authService.loggedUser = this.hospital;
          resolve(true);
        }).catch(error => {
          console.log(error);
        });
      } else {
        resolve(true);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
