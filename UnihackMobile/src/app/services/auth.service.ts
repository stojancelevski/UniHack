import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean;

    constructor(private auth: AngularFireAuth) {
    }

    loginUser(
        email: string,
        password: string
    ) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signupUser(email: string, password: string) {
        return this.auth
            .createUserWithEmailAndPassword(email, password);
    }

    resetPassword(email: string): Promise<void> {
        return this.auth.sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<void> {
        return this.auth.signOut();
    }
}
