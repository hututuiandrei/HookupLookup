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
    new Formular('Dorel a scapat o cutie de lapte pe jos. Cateva picaturi ti-au ' + 
    'sarit pe fata, esti ok cu asta ?', ['Da', 'Nu']),
    new Formular('Dorel e neatent si ii scapa din nou cutia, de data aceasta esti ' + 
    'plina de lapte pe corp, esti ok cu asta ?', ['Da', 'Nu']),
    new Formular('Dorel vrea sa intre in curtea ta si observa cele doua intrari, ' + 
    'este ok daca intra pe amandoua ??', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intre doar pe una din porti?', ['Da', 'Nu']),
    new Formular('Anul acesta de Halloween poti sa te deghizezi intr-o caprita, ti-ar placea asta ', ['Da', 'Nu']),
    new Formular('Iti place sa faci misiuni, vrei sa fii o misionara ?', ['Da', 'Nu']),
    new Formular('69 este numarul tau norocos ? ', ['Da', 'Nu']),
    new Formular('Dorel vrea sa traga parul din curtea ta de crengi, esti ok cu asta ?', ['Da', 'Nu']),
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
