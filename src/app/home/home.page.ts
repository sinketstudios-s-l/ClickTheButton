import { Component, OnInit } from '@angular/core';
//import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController, Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { AdMobFreeService } from '../services/ad-mob-free.service';
import { Router } from '@angular/router';
import { ShopPage } from '../pages/shop/shop.page';
import { SoundService } from '../services/sound.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  date = new Date().getFullYear()
  version = "Build version 0.1.560"

  lastCount
  realCount
  count: number = 0

  coins: number = Number(localStorage.getItem('coins'))



  lifeTimeCount: number = 0
  constructor(
    private modalCtrl: ModalController,
    private adMobSvc: AdMobFreeService,
    private platform: Platform,
    private route: Router,
    private toastCtrl: ToastController,
    private soundSvc: SoundService
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

    if (!this.lastCount || !this.coins) {
      this.lastCount = 0
      this.coins = 0
    }

  }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.adMobSvc.banner()
      this.soundSvc.background()
    })

  }




  counter() {

    new Audio('../../assets/sounds/button.mp3').play()

    //this.vibration.vibrate(100)

    //this.nativeAudio.play('bbutton')

    this.count = this.count + 1

    ////////  COINS SYSTEM  ////////

    if (this.count.toString().substr(this.count.toString().length - 2, this.count.toString().length).includes('00')) {
      this.coins = this.coins + 10
      localStorage.setItem('coins', this.coins.toString())
      new Audio('../../assets/sounds/reward.mp3').play()

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


}
