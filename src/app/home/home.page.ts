import { Component, OnInit } from '@angular/core';
//import { Vibration } from '@ionic-native/vibration/ngx';
//import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ModalController, Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { AdMobFreeService } from '../services/ad-mob-free.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  date = new Date().getFullYear()
  version = "Build version 0.1.550"
  
  lastCount
  count:number = 0

  coins:number = 0
  constructor(
    //private nativeAudio: NativeAudio,
    private modalCtrl: ModalController,
    private adMobSvc: AdMobFreeService,
    private platform: Platform,
    private route: Router,
    private toastCtrl: ToastController
  ) {

    //nativeAudio.preloadSimple('button', '../../assets/sounds/button.mp3')

    this.lastCount = localStorage.getItem('count')

    this.count = Number(this.lastCount)

    if(!this.lastCount){
      this.lastCount = 0
    }

  }

  ngOnInit(){

    this.platform.ready().then(() => {
      this.adMobSvc.banner()

    })

  }
  

  counter(){  

    //this.vibration.vibrate(100)

    //this.nativeAudio.play('bbutton')

    this.count = this.count + 1

    ////////  COINS SYSTEM  ////////

    // if(this.count.toString().substr(this.count.toString().length - 1,this.count.toString().length).includes('0')){
    //   this.coins = this.coins + 10
    // } 

    ////////////////////////////////

    switch (this.count){
      case 200:
        console.log('200!! yayyyy')
      break;
      case 201:
        console.log('201!! yayyyy')
      break;
      case 210:
        console.log('210!! yayyyy')
      break;
      case 220:
        console.log('220!! yayyyy')
      break;
      case 230:
        console.log('230!! yayyyy')
      break;
      case 240:
        console.log('240!! yayyyy')
      break;
      case 250:
        console.log('250!! yayyyy')
      break;
    }
    

    localStorage.setItem('count', this.count.toString())

    this.lastCount = localStorage.getItem('count')

  


  }

  async settings(){

    const modal = await this.modalCtrl.create({
      component: SettingsPage
    })

    await modal.present()
  }

  leaderboard(){
    this.route.navigate(['/leaderboard'])
  }

  achievements(){
    this.route.navigate(['/achievements'])
  }

}
