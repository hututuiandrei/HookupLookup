import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  user: firebase.User;
  quest: any;
  lovers: {};
  private subUser: Subscription;
  private subInbox: Subscription;

  constructor(private auth: AuthService,
    private router: Router) { }
  ngOnInit() {
    
    this.subUser = this.auth.getUserState()
    .subscribe (user => {

      this.user = user;
      if(user) {
        this.auth.getUserData(user).subscribe( userData => {
        this.quest = userData.get('questionnaire');
        this.subInbox = this.auth.getInbox(this.user).
        subscribe( inbox => {

          this.lovers = inbox;
          });      
        });
      } else {
        if(this.subInbox)
          this.subInbox.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.subUser.unsubscribe();
  }

  register() {

    this.router.navigate(['/register']);
  }

  login() {

    this.router.navigate(['/login']);
  }

  logout() {

    this.auth.logout();
  }
}
