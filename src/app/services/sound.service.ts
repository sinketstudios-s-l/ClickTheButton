import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  bgSound = new Audio('../../assets/sounds/background.mp3')

  sound = localStorage.getItem('sound')
  fx = localStorage.getItem('fx')
  constructor() { }

  background() {
    this.bgSound.loop = true

    if (this.sound == "true") {
      this.bgSound.play()
    } else {
      this.bgSound.muted = true
    }
  }

  toggleSound() {

    if (this.sound == "true") {
      localStorage.setItem('sound', 'false')
      this.bgSound.muted = true

    } else if (this.sound == "false") {
      localStorage.setItem('sound', 'true')
      this.bgSound.muted = false
      this.bgSound.play()
    }

  }

  toggleFX(){

    if (this.fx == "true") {
      localStorage.setItem('fx', 'false')

    } else if (this.fx == "false") {
      localStorage.setItem('fx', 'true')

    }


  }

  achievSound(){
    new Audio('../../assets/sounds/achievement.wav').play()
  }

  rewardSound(){
    new Audio('../../assets/sounds/reward.mp3').play()
  }
}



