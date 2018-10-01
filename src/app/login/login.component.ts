import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = 'adam.g.keenan@gmail.com';
  public password: string = 'password';

  constructor(private $auth: AngularFireAuth, private $db: AngularFirestore, private $router: Router) { }

  public ngOnInit() {
    this.$auth.idToken.subscribe((token) => {
      if (token === null) {
        return;
      }

      console.log('Already logged in, redirecting');
      this.$router.navigate(['home']);
    });
  }

  public login() {
    if (this.email === '' || this.password === '') {
      return;
    }

    this.$auth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then((cred) => {
      console.log('sign in:', cred.user);
      this.$router.navigate(['home']);
    })
    .catch((err) => {
      console.error('sign in error', err);
    });
  }

  public signUp() {
    const displayName = this.email.split('@')[0];
    this.$auth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then((cred) => {
      console.log('new user:', cred.user);
      if (cred.user) {
        const uid = cred.user.uid;
        Promise.all([
          cred.user.updateProfile({
            displayName: displayName,
            photoURL: null,
          }).then(() => {
            cred.user!.sendEmailVerification();
          }),
          this.$db.collection('users').add({
            uid: uid,
            displayName: displayName,
            username: displayName,
          }),
        ])
        .then(() => {
          this.$router.navigate(['home']);
        });
      }
    })
    .catch((err) => {
      console.error('sign up error', err);
    });
  }

}
