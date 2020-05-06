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
    new Formular('Scapi o cutie cu lapte de la scoala pe podea, cutia s-a spart' + 
    ' si cateva picaturi de lapte au sarit pe fata Mariei. Esti ok cu acest lucru ??', ['Da', 'Nu']),
    new Formular('Iei alta cutie, dar esti neatent din nou, si picaturi de lapte' +
    ' sar pe toata Maria. Esti ok cu acest lucru ??', ['Da', 'Nu']),
    new Formular('Vrei sa intri in curtea Mariei si vezi doua intrari' +
    ', ti-ar placea sa intri pe amandoua?', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intri doar pe una din porti ?', ['Da', 'Nu']),
    new Formular('Iti plac caprele ?', ['Da', 'Nu']),
    new Formular('Iti place sa faci misiuni, vrei sa fii un misionar ?', ['Da', 'Nu']),
    new Formular('69 este numarul tau norocos ? ', ['Da', 'Nu']),
    new Formular('Parul din curtea Mariei are multe crengi, ti-ar placea sa tragi de ele ?', ['Da', 'Nu']),
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
