import { Injectable } from '@angular/core';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdMobFreeService {

  bannerConfigAndroid: AdMobFreeBannerConfig = {
    isTesting: false,
    autoShow:true,
    id: "ca-app-pub-3993710682934611/2703058884"
  }

  bannerConfigIOS: AdMobFreeBannerConfig = {
    isTesting: false,
    autoShow:true,
    id: "ca-app-pub-3993710682934611/6261323658"
  }

  rewardConfigAndroid: AdMobFreeRewardVideoConfig = {
    isTesting: false,
    autoShow:true,
    id: "ca-app-pub-3993710682934611/4725905773"
  }

  rewardConfigIOS: AdMobFreeRewardVideoConfig = {
    isTesting: false,
    autoShow:true,
    id: "ca-app-pub-3993710682934611/3018072431"
  }

  constructor(
    private adMobFree: AdMobFree,
    private platform: Platform
  ) { }
  
  banner(){
    if(this.platform.is('android')){
      this.adMobFree.banner.config(this.bannerConfigAndroid)
    }else if(this.platform.is('ios')){
      this.adMobFree.banner.config(this.bannerConfigIOS)
    }

    this.adMobFree.banner.prepare()
    .then(ev => {
      console.log(ev)
    }).catch (err => console.log(err))

  }

  bonusReward(){

    if(this.platform.is('android')){
      this.adMobFree.rewardVideo.config(this.rewardConfigAndroid)
    }else if(this.platform.is('ios')){
      this.adMobFree.rewardVideo.config(this.rewardConfigIOS)

    }

    this.adMobFree.rewardVideo.prepare()
    .then(ev => {
      console.log(ev)
      localStorage.setItem('bonus', 'true')
    }).catch (err => console.log(err))

  }
}
