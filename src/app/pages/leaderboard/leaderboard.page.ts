import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  main
  sub
  leaderList = []
  uid = localStorage.getItem("uid")
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {


    this.main = this.afs.collection('users')
    this.sub = this.main.valueChanges().subscribe( ev => {
        this.leaderList = ev
    })


    if (!this.uid) {

        this.accReg()

    }


  }

  private randomString(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  async accReg() {

    const alert = await this.alertCtrl.create({

      header: "Setting Account",
      message: "Please, type your username",
      mode: "md",
      inputs: [
        {
          type: "text",
          placeholder: "Username",
          name: "user"
        }
      ],
      buttons: [
        {
          role: "cancel",
          text: "cancel",
          cssClass: "danger",
          handler: () => {
            this.router.navigate(['/home'])
          }

        },
        {
          text: "next",
          handler: () => {

            this.uid = this.randomString(30)

            this.afs.doc(`users/${this.uid}`).set({
                uid: this.uid,
                
            }).then(()=> {
              localStorage.setItem('uid', this.uid) 
            })
            
          }
        }
      ]
    })

    await alert.present()

  }



}
