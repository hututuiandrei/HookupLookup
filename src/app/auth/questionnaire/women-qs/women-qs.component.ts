import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Formular } from '../formular';

@Component({
  selector: 'app-women-qs',
  templateUrl: './women-qs.component.html',
  styleUrls: ['./women-qs.component.css']
})
export class WomenQsComponent implements OnInit {

  authError: any;
  constructor(private auth: AuthService) { }

  formGirls = [
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
    new Formular('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', ['Da', 'Nu']),
  ]

  getSelAnswers(forms: Formular[]) {
    var res = new Array();
    for(let form of forms)
      res.push(form.selAnswer);
    return res;
  }

  calculateScore(forms: Formular[], selAnswers: String[]) {
    var freqVect = new Array(selAnswers.length).fill(0);
    for(let i in forms) {
      freqVect[forms[i].answers.indexOf(selAnswers[i])]++
    }
    var numYes = freqVect[0];
    return Math.floor(numYes / 2);
  }

  ngOnInit() {
    this.auth.clearErr();
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  submit() {
    var selAnswers = this.getSelAnswers(this.formGirls);
    var score = this.calculateScore(this.formGirls, selAnswers);
    this.auth.submit(selAnswers, score);
  }

  back() {
    this.auth.back();
  }

}
