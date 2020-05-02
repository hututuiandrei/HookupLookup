import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  quest: any;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.auth.getUserState()
    .subscribe (user => {

      this.user = user;
      if(user) {

        this.auth.getUserData(user).subscribe( userData => {

          this.quest = userData.get('questionnaire');
        });
      }
    }); 
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
