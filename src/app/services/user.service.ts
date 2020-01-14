import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid = localStorage.getItem('uid')
  ban
  constructor(
    private afs: AngularFirestore,
    private platform: Platform
  ) { }


  checkUser() {

    switch (this.uid) {
      case "":
        this.uid = this.generateUID(30)
        this.afs.doc(`users/${this.uid}`).set({
          uid: this.uid,
          count: 0,
          ban: false,
          date: new Date()

        })
        localStorage.setItem('uid', this.uid)

        console.log(this.uid)

        break;
      case this.uid:
        // this.banStatus()
        break;

    }

  }

  banStatus() {
    this.afs.doc(`users/${this.uid}`).valueChanges().subscribe(e => {
      this.ban = e['ban']
    })

    console.log(this.ban)
    switch (this.ban) {
      case true:

        localStorage.setItem('count', '0')
        console.log(this.ban)

        break;
    }

  }


  private generateUID(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



}
