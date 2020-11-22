import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    email: string;
    pass: string;
    name: string;
    bloodType: string;
    lastDonation: string;
    address: string;
    phoneNumber: string;
    createUser: boolean = false;
    eventId: string;

    constructor(
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private db: DatabaseService,
        private storage: Storage,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.storage.get('loggedInUser').then((val) => {
            console.log(val);
            if ( val !== 0 && val !== null ) {
                this.router.navigateByUrl('/home');
            } else {
                this.router.navigate(['/login']);
            }
        });

    }

    getExtraInfo() {
        this.createUser = true;
    }

    async registerUser() {
        this.authService.signupUser(this.email, this.pass).then((resp) => {
            let user = {
                'email': resp.user.email,
                'uid': resp.user.uid,
                'bloodType': this.bloodType,
                'lastDonation': '',
                'address': this.address,
                'phoneNumber': this.phoneNumber,
                'name': this.name
            }
            console.log(user);
            this.db.createUser(user);
        })
    }

    async loginUser() {
        this.authService.loginUser(this.email, this.pass).then((resp) => {
            this.storage.set('loggedInUser', resp.user.uid);
            this.router.navigateByUrl('/register-event');
        });
    }
}
