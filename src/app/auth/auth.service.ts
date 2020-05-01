import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  getUserData(user){
    return this.db.doc(`Users/${user.uid}`).get();
  }

  login(user) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
          this.eventAuthError.next('');
        }
      })
  }

  createUser(user) {
    console.log(user);
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
          this.router.navigate(['/questionnaire']);
          this.eventAuthError.next('');
        });
      })
      .catch( error => {

        console.log(error);
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      questionnaire: null
    })
  }

  submit(quest) {

    this.afAuth.currentUser
      .then( user => {
        this.updateQuestionnaire(user.uid, quest)
          .then(() => {

            this.router.navigate(['/home']);
            this.eventAuthError.next('');
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  updateQuestionnaire(uid: String, quest) {

    return this.db.doc(`Users/${uid}`).update({
      questionnaire: {

        fruit: quest.fruit,
        car: quest.car
      }
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

  back() {

    this.router.navigate(['/home']);
  }
}