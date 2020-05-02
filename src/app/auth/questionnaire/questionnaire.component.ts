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

  formsBoys = [
    new Formular('Scapi o cutie cu lapte de la scoala pe podea, cutia s-a spart' + 
    ' si cateva picaturi de lapte au sarit pe fata Mariei. Esti ok cu acest lucru ??', ['Da', 'Nu']),
    new Formular('Iei alta cutie, dar esti neatent din nou, si picaturi de lapte' +
    'sar pe toata Maria. Esti ok cu acest lucru ??', ['Da', 'Nu']),
    new Formular('Vrei sa intri in curtea Mariei si vezi doua intrari, una vopsita' +
    'cu roz si una cu maro, ti-ar placea sa intri pe amandoua?', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intri doar pe poarta roz ?', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intri doar pe poarta maro ?', ['Da', 'Nu']),
    new Formular('Iti plac caprele ?', ['Da', 'Nu']),
    new Formular('Iti place sa faci misiuni, vrei sa fii un misionar ?', ['Da', 'Nu']),
    new Formular('69 este numarul tau norocos ? ', ['Da', 'Nu']),
    new Formular('Parul din curtea Mariei are multe crengi, ti-ar placea sa tragi de ele ?', ['Da', 'Nu']),
  ]

  formGirls = [
    new Formular('Dorel a scapat o cutie de lapte pe jos. Cateva picaturi ti-au' + 
    'sarit pe fata, esti ok cu asta ?', ['Da', 'Nu']),
    new Formular('Dorel e retardat si ii scapa din nou cutia, de data aceasta esti' + 
    'plina de lapte pe corp, esti ok cu asta ?', ['Da', 'Nu']),
    new Formular('Dorel vrea sa intre in curtea ta si observa cele doua intrari,' + 
    'una vopsita in roz si alta in maro, este ok daca intra pe amandoua ??', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intre doar pe poarta roz ?', ['Da', 'Nu']),
    new Formular('Ti-ar placea sa intre doar pe poarta maro ?', ['Da', 'Nu']),
    new Formular('Anul acesta de Halloween vei fi o capra, ti-ar placea asta ', ['Da', 'Nu']),
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
    return numYes / 2;
  }

  ngOnInit() {
    this.auth.clearErr();
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  submit() {
    var selAnswers = this.getSelAnswers(this.formsBoys);
    var score = this.calculateScore(this.formsBoys, selAnswers);
    this.auth.submit(selAnswers, score);
  }

  back() {
    this.auth.back();
  }
}
