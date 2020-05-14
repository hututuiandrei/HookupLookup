import { Injectable} from '@angular/core'
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

  getInbox(user) {
    return this.db.collection(`Users/${user.uid}/Inbox`).valueChanges({idField: 'id'});
  }

  login(user) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        var newUser = user;
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential, newUser)
          .then(() => {
          this.router.navigate(['/select-gender']);
        });
      })
      .catch( error => {

        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential, newUser: any) {

    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: newUser.email,
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      sex: newUser.gender,
      questionnaire: null
    });
  }

  submit(quest, score) {
    this.afAuth.currentUser
      .then( user => {
        this.updateQuestionnaire(user.uid, quest, score)
          .then(() => {
            this.db.doc(`Users/${user.uid}`).ref.get()
              .then(userdata => {
                this.db.collection("Users").ref
                .where("score", "==", score)
                .where("sex", "==", this.getOppositeSex(userdata.data().sex))
                .get()
                  .then(querry => {
                    querry.forEach(doc => {
                      if(doc.id != user.uid) {
                        this.insertLover(user.uid, doc.id, doc.data().firstname, doc.data().lastname);
                        this.insertLover(doc.id, user.uid, userdata.data().firstname, userdata.data().lastname)
                      }
                  })
                });
              });
            this.router.navigate(['/home']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  updateQuestionnaire(uid: String, quest, score) {
    return this.db.doc(`Users/${uid}`).update({
      questionnaire: quest,
      score: score
    });
  }
  
  insertLover(uid: String, loverId: String, loverFirstName: String, loverLastName: String) {
    this.db.doc(`Users/${uid}/Inbox/${loverId}`).set({

      firstname: loverFirstName,
      lastname: loverLastName,
      message: "",
      sentMessage: ""
    });
  }

  sendMessage(lover, message: String) {
    this.afAuth.currentUser
      .then( user => {

        this.db.doc(`Users/${lover.id}/Inbox/${user.uid}`).update({
          message: message
        });
        this.db.doc(`Users/${user.uid}/Inbox/${lover.id}`).update({
          sentMessage: message
        });
    });
  }

  clearErr() {
    this.eventAuthError.next('');
  }

  logout() {

    return this.afAuth.signOut();
  }

  back() {
    this.router.navigate(['/home']);
  }

  private getOppositeSex(sex: String) {

    if(sex == "male")
      return "female";
    else 
      return "male";
  }
}