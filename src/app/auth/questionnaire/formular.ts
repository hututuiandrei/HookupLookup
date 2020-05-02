import { analytics } from 'firebase';

export class Formular {

    question: String;
    selAnswer: String;
    answers: String[];
  
    constructor(question: String, answers: Array<string>) {
  
      this.answers = answers;
      this.question = question;
      this.selAnswer = '';
    }
  }