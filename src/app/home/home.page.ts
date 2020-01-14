import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController, PopoverController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { AdMobFreeService } from '../services/ad-mob-free.service';
import { Router } from '@angular/router';
import { ShopPage } from '../pages/shop/shop.page';
import { SoundService } from '../services/sound.service';
import { UserService } from '../services/user.service';
import { InfoPage } from '../pages/info/info.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AchievServiceService } from '../services/achiev-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  date = new Date().getFullYear()
  version = "Build v.0.1.615"

  lastCount
  realCount
  count: number = 0

  coins: number = Number(localStorage.getItem('coins'))
  lifeTimeCount: number = 0
  sound = localStorage.getItem('sound')

  uid = localStorage.getItem('uid')
  ban = localStorage.getItem('ban')
  constructor(
    private modalCtrl: ModalController,
    private adMobSvc: AdMobFreeService,
    private platform: Platform,
    private route: Router,
    private toastCtrl: ToastController,
    private soundSvc: SoundService,
    private userSvc: UserService,
    private popOverCtrl: PopoverController,
    private afs: AngularFirestore,
    private achvSvc: AchievServiceService
  ) {



    const formatCash = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " k";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    };

    this.lastCount = formatCash(localStorage.getItem('count'))

    this.count = Number(localStorage.getItem('count'))

    this.realCount = Number(localStorage.getItem('count'))

    this.lifeTimeCount = Number(sessionStorage.getItem('lifeCount'))

    

    if (!this.lastCount) {
      this.lastCount = 0
    } if (!this.coins) {
      localStorage.setItem('coins', '0')
      this.coins = 0
    } if (!this.sound) {
      soundSvc.background()
      localStorage.setItem('sound', 'true')
    } if (!this.uid){
      this.uid = this.generateUID(30)
        this.afs.doc(`users/${this.uid}`).set({
          uid: this.uid,
          count: 0,
          ban: false,
          leaderboard: false,
          date: new Date()

        })
        localStorage.setItem('uid', this.uid)
    }



  }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.adMobSvc.banner()
      this.soundSvc.background()
    })

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

  counter() {

    new Audio('../../assets/sounds/button.mp3').play()


    this.count = this.count + 1

    switch(this.count){
      case 500:
        this.soundSvc.achievSound()
        this.achvSvc.achiev("d","d", "2")
        break;
    }

    ////////  COINS SYSTEM  ////////

    if (this.count.toString().substr(this.count.toString().length - 2, this.count.toString().length).includes('00')) {
      this.coins = this.coins + 10
      localStorage.setItem('coins', this.coins.toString())
      this.soundSvc.rewardSound()

    }

    ////////////////////////////////


    const formatCash = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " k";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    };

    this.lifeTimeCount = this.lifeTimeCount + 1

    sessionStorage.setItem('lifeCount', this.lifeTimeCount.toString())

    localStorage.setItem('count', this.count.toString())

    this.lastCount = formatCash(Number(localStorage.getItem('count')))

    this.realCount = Number(localStorage.getItem('count'))

  }

  async settings() {

    const modal = await this.modalCtrl.create({
      component: SettingsPage
    })

    await modal.present()
  }

  leaderboard() {

    if (this.realCount <= 500) {

    } else {
      this.route.navigate(['/leaderboard'])
    }

  }

  achievements() {
    this.route.navigate(['/achievements'])
  }

  stats() {
    this.route.navigate(['/stats'])
  }

  async shop() {

    const modal = await this.modalCtrl.create({
      component: ShopPage
    })
    await modal.present()
  }


  async info(e) {

    console.log(e.target.id)

    var id = e.target.id

    const popOver = await this.popOverCtrl.create({
      component: InfoPage,
      mode: "ios",
      componentProps: {
        id: id
      },
      cssClass: "popOver"
    })
    await popOver.present()
  }

}
