import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Formular } from './formular';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent implements OnInit {

  authError: any;
  constructor(private auth: AuthService) { }

  forms = [
    new Formular('Ce masina iti place ?', ['Skoda', 'Mercedes', 'BMW', 'Audi']),
    new Formular('Ce fruct iti place ?', ['Mar', 'Para', 'Ananas', 'Capsuna']),
    new Formular('Ce fruct iti place ?', ['Mar', 'Para', 'Ananas', 'Capsuna']),
    new Formular('Ce fruct iti place ?', ['Mar', 'Para', 'Ananas', 'Capsuna']),
  ]

  getSelAnswers(forms: Formular[]) {
    var res = new Array();
    for(let form of forms)
      res.push(form.selAnswer);
    return res;
  }

  calculateScore(forms: Formular[], selAnswers: String[]) {
    var freqVect = new Array(selAnswers.length).fill(0);
    var max = -1, resIndex;
    for(let i in forms) {
      freqVect[forms[i].answers.indexOf(selAnswers[i])]++
    }
    for(let i in freqVect) {
      if(freqVect[i] > max) {
        max = freqVect[i];
        resIndex = i;
      }
    }
    return resIndex;
  }

  ngOnInit() {
    this.auth.clearErr();
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  submit() {
    var selAnswers = this.getSelAnswers(this.forms);
    var score = this.calculateScore(this.forms, selAnswers);

    console.log(score);
    console.log(this.getSelAnswers(selAnswers));
    this.auth.submit(selAnswers, score);
  }

  back() {

    this.auth.back();
  }
}
