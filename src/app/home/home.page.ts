import { Component, OnInit } from '@angular/core';
//import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController, Platform, ActionSheetController, ToastController, PopoverController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { AdMobFreeService } from '../services/ad-mob-free.service';
import { Router } from '@angular/router';
import { ShopPage } from '../pages/shop/shop.page';
import { SoundService } from '../services/sound.service';
import { PopoverPage } from '../pages/popover/popover.page';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  date = new Date().getFullYear()
  version = "Build version 0.1.580"

  lastCount
  realCount
  count: number = 0

  coins: number = Number(localStorage.getItem('coins'))

  lifeTimeCount: number = 0
  button

  uid = localStorage.getItem('uid')
  ban = localStorage.getItem('ban')
  bonus = localStorage.getItem('bonus')
  bonusTime: number;
  bonusCounter
  constructor(
    private modalCtrl: ModalController,
    private adMobSvc: AdMobFreeService,
    private platform: Platform,
    private route: Router,
    private toastCtrl: ToastController,
    private soundSvc: SoundService,
    private popCtrl: PopoverController,
    private afs: AngularFirestore
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

    this.button = localStorage.getItem('btn')


    if (!this.lastCount) {
      this.lastCount = 0
    } else if (!this.coins) {
      this.coins = 0
    } else if (!localStorage.getItem('sound')) {
      localStorage.setItem('sound', 'true')
    } else if (!localStorage.getItem('bonus')) {
      localStorage.setItem('bonus', 'false')
    }



    this.bonusCountDown()




    /// AUTOSAVER SYSTEM ////

    // var counter = setInterval(x => {
    //   var time = Number(localStorage.getItem('time'))
    //   time += 1;

    //   if (time >= 30) {
    //     localStorage.setItem('time','0')
    //     time = 0
    //     this.afs.doc(`users/${this.uid}`).update({
    //       count: this.count
    //     })
    //   }

    //   localStorage.setItem('time', time.toString())
    // }, 1000);

    /////////////////////////////
  }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.adMobSvc.banner()
      this.soundSvc.background()
    })

  }

  /// BONUS SYSTEM ///

  getBonus() {
    clearInterval(this.bonusCounter)
    var bonusDiv = document.getElementById("bonusT")
    bonusDiv.style.display = "none"

    this.adMobSvc.bonusReward()
  }


  bonusCountDown() {

    this.bonusCounter = setInterval(x => {
      var bonusDiv = document.getElementById("bonusT")
      bonusDiv.style.display = "block"
      var time = Number(localStorage.getItem('bonusTime'))
      time -= 1;

      if (time == 0) {
        time = 15
        clearInterval(this.bonusCounter)
        bonusDiv.style.display = "none"
      }

      localStorage.setItem('bonusTime', time.toString())
      this.bonusTime = Number(localStorage.getItem('bonusTime'))
    }, 1000);
  }
  ///////////////////

  counter() {

    new Audio('../../assets/sounds/button.mp3').play()

    if (this.bonus == 'true') {
      this.count = this.count + 2
    } else {
      this.count = this.count + 1
    }


    ////////  COINS SYSTEM  ////////

    if (this.count.toString().substr(this.count.toString().length - 2, this.count.toString().length).includes('00')) {
      this.coins = this.coins + 10
      localStorage.setItem('coins', this.coins.toString())
      new Audio('../../assets/sounds/reward.mp3').play()

    }

    ////////////////////////////////

    switch (this.count) {
      case 500:
        // this.popOver("500")
        new Audio("../../assets/sounds/achievement.wav").play()
        break;
      case 100000:

        break;
    }

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

  async popOver(id: string) {
    const pop = await this.popCtrl.create({
      component: PopoverPage,
      id: id
    })
    await pop.present()
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


}
