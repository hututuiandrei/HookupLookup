import { Component, OnInit } from '@angular/core';
import { Formular } from '../formular';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-men-qs',
  templateUrl: './men-qs.component.html',
  styleUrls: ['./men-qs.component.css']
})
export class MenQsComponent implements OnInit {

  authError: any;
  constructor(private auth: AuthService) { }

  formBoys = [
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
    var selAnswers = this.getSelAnswers(this.formBoys);
    var score = this.calculateScore(this.formBoys, selAnswers);
    this.auth.submit(selAnswers, score);
  }

  back() {
    this.auth.back();
  }

}
