import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  private pastLength: number;
  private canToast: boolean;


  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    
    this.pastLength = -1;
  
    this.subUser = this.auth.getUserState()
    .subscribe (user => {

      this.user = user;
      if(user) {
        this.auth.getUserData(user).subscribe( userData => {
        this.quest = userData.get('questionnaire');
        this.subInbox = this.auth.getInbox(this.user).
        subscribe( inbox => {

          if(this.pastLength >= 0 && this.canToast) {
            if(inbox.length == this.pastLength) {
              this.toastr.info('You received a new message',
              '', {positionClass:'toast-top-left'});
            } else {
              this.toastr.warning('You have a new match',
              '', {positionClass:'toast-top-left'});
            }
          }
          this.lovers = inbox;
          this.pastLength = inbox.length;
          this.canToast = true;
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

  sendMessage(lover, message: String) {

    this.canToast = false;
    this.auth.sendMessage(lover, message);
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
