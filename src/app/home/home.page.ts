import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  date = new Date().getFullYear()
  version = "Beta v.0.1.453ab"
  
  lastCount
  count:number = 0
  constructor(
    private nativeAudio: NativeAudio
  ) {

    nativeAudio.preloadSimple('button', '../../assets/sounds/button.mp3')

    this.lastCount = localStorage.getItem('count')

    this.count = Number(this.lastCount)

  }


  counter(){

    //this.vibration.vibrate(100)

    this.nativeAudio.play('bbutton')

    this.count = this.count + 1

    localStorage.setItem('count', this.count.toString())

    this.lastCount = localStorage.getItem('count')


  }

}
