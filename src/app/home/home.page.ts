import { Component, OnInit } from '@angular/core';
//import { Vibration } from '@ionic-native/vibration/ngx';
//import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { AdMobFreeService } from '../services/ad-mob-free.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  date = new Date().getFullYear()
  version = "Beta v.0.1.548a"
  
  lastCount
  count:number = 0
  constructor(
    //private nativeAudio: NativeAudio,
    private modalCtrl: ModalController,
    private adMobSvc: AdMobFreeService,
    private platform: Platform
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

    localStorage.setItem('count', this.count.toString())

    this.lastCount = localStorage.getItem('count')


  }


  async settings(){

    const modal = await this.modalCtrl.create({
      component: SettingsPage
    })

    await modal.present()



  }

}
