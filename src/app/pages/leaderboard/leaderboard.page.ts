import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
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
  img = "data:image/jpeg;base64,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"
  count = Number(localStorage.getItem("count"))

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

    


    if (!this.uid) {

      this.accReg()

    }


  }

  renderList(doc) {

    let row = document.getElementById('rowList')

    let item = document.createElement('div')
    let itemLight = document.createElement('div')
    let leaderPos = document.createElement('div')
    let user = document.createElement('label')
    let countCont = document.createElement('div')
    let count = document.createElement('span')
    
    
    item.setAttribute('class', 'item')
    item.style.background = "#c7c7c7"
    item.style.border = "1px solid #b9b9b9"
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
    itemLight.style.background = "#d6d6d6"
    itemLight.style.borderRadius = "5px"
    itemLight.style.position = "absolute"
    itemLight.style.height = "20px"
    itemLight.style.zIndex = "1"
    itemLight.style.top = "0"


    leaderPos.style.position = "absolute"
    leaderPos.style.left = "2rem"
    leaderPos.style.top = "50%"
    leaderPos.style.transform = "translate(-50%, -50%)"
    leaderPos.style.background = "#f1f1f1"
    leaderPos.style.padding = "10px"
    leaderPos.innerHTML = "1"
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

    
    countCont.style.position = "absolute"
    countCont.style.right = "0%"
    countCont.style.top = "50%"
    countCont.style.transform = "translate(-50%, -50%)"
    countCont.style.background = "#969696"
    countCont.style.width = "50px"
    countCont.style.color = "white"
    countCont.style.fontWeight = "bold"
    countCont.style.padding = "10px"
    countCont.style.borderRadius = "5px"
    countCont.style.zIndex = "2"


    
    count.innerHTML = doc.data().count
    
    
    item.appendChild(leaderPos)
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

            console.log(data)

            this.afs.doc(`users/${this.uid}`).set({
              uid: this.uid,
              img: this.img,
              count: this.count,
              user: data.user

            }).then(() => {
              localStorage.setItem('uid', this.uid)
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

    })



  }



}
