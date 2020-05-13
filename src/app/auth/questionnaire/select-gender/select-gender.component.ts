import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.css']
})
export class SelectGenderComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {}

  choseMen() {

    console.log("men")
    this.router.navigate(['/womenqs']);
  }

  choseWomen() {

    console.log("women")
    this.router.navigate(['/menqs'])
  }

}
