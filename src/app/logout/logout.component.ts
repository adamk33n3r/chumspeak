import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private $auth: AngularFireAuth, private $router: Router) { }

  public ngOnInit() {
    this.$auth.auth.signOut().then(() => {
      this.$router.navigate(['']);
    });
  }

}
