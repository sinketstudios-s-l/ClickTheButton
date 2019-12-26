import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  main
  sub
  leaderList
  uid = localStorage.getItem("uid")
  count = Number(localStorage.getItem("count"))
  userRef = firebase.database().ref('users/')

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {

    this.afs.collection('users').ref.orderBy('count', 'desc').get()
      .then((snapshop) => {
        snapshop.docs.forEach(doc => {
          this.renderList(doc)
        })
      })

    if (!this.uid) { this.accReg() }


  }

  renderList(doc) {

    const formatCash = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " k";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    };

    let row = document.getElementById('rowList')

    let item = document.createElement('div')
    let itemLight = document.createElement('div')
    let leaderPos = document.createElement('div')
    let user = document.createElement('label')
    let countCont = document.createElement('div')
    let count = document.createElement('span')
    
    
    item.setAttribute('class', 'item')
    item.style.background = "#bcd5d6"
    item.style.border = "1px solid #aac4c5"
    item.style.width = '90%'
    item.style.margin = " 1rem auto"
    item.style.textAlign = "center"
    item.style.position = "relative"
    item.style.padding = "5px"
    item.style.height = "70px"
    item.style.borderRadius = "10px"
    item.style.zIndex = "0"
    item.style.boxShadow = "3px 3px 10px -4px rgba(0,0,0,0.65)"

    itemLight.style.width = "97%"
    itemLight.style.margin = " 5px auto"
    itemLight.style.background = "#d1ebec"
    itemLight.style.borderRadius = "5px"
    itemLight.style.position = "absolute"
    itemLight.style.height = "20px"
    itemLight.style.zIndex = "1"
    itemLight.style.top = "0"


    leaderPos.innerHTML = "1"

    leaderPos.style.position = "absolute"
    leaderPos.style.left = "2rem"
    leaderPos.style.top = "50%"
    leaderPos.style.transform = "translate(-50%, -50%)"
    leaderPos.style.background = "#f1f1f1"
    leaderPos.style.padding = "10px"
    leaderPos.style.zIndex = "2"
    leaderPos.style.minWidth = "35px"
    leaderPos.style.height = "35px"
    leaderPos.style.borderRadius = "5px"
    

    user.innerHTML = doc.data().user
    user.style.position = "absolute"
    user.style.left = "6rem"
    user.style.top = "50%"
    user.style.transform = "translate(-50%, -50%)"
    user.style.zIndex = "2"
    user.style.padding = "10px"
    user.style.fontSize = "20px"

    
    countCont.style.position = "absolute"
    countCont.style.right = "0%"
    countCont.style.top = "50%"
    countCont.style.transform = "translate(-50%, -50%)"
    countCont.style.background = "#9cc6c7"
    countCont.style.minWidth = "50px"
    countCont.style.color = "white"
    countCont.style.fontWeight = "bold"
    countCont.style.padding = "10px"
    countCont.style.borderRadius = "5px"
    countCont.style.zIndex = "2"


    
    count.innerHTML = formatCash(doc.data().count)    
    
    // item.appendChild(leaderPos)
    item.appendChild(itemLight)
    item.appendChild(user)
    item.appendChild(countCont)
    countCont.appendChild(count)
    row.appendChild(item)

    
  }

  private randomString(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
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
          handler: data => {

            this.uid = this.randomString(30)            

            this.afs.doc(`users/${this.uid}`).set({
              uid: this.uid,
              count: this.count,
              user: data.user

            }).then(() => {
              localStorage.setItem('uid', this.uid)
              window.location.reload()
            })

          }
        }
      ]
    })

    await alert.present()

  }




  async sync() {

    const loading = await this.loadingCtrl.create({
      message: "loading",
      translucent: true,
    })
    await loading.present()


    this.afs.doc(`users/${this.uid}`).update({
      count: this.count
    }).then(async () => {

      await loading.dismiss()
      window.location.reload()

    })



  }


  dataaa(){

    let data = {
      user: "sasd",
      adssa: "asdasd"
    }

    this.userRef.push(data)
  }


}
