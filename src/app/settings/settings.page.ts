import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  count
  theme

  date = new Date().getFullYear()
  version = "Build version 0.1.560"

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.count = localStorage.getItem('count')
    this.count = Number(this.count)

    this.theme = localStorage.getItem('theme')
  }

  async presentAlert(header:string, message:string){
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: "Reset",
          handler: () => {
            localStorage.setItem('count', '0')
            window.location.reload()
          }
        }
      ]
    })
    await alert.present()
  }

  close(){
    this.modalCtrl.dismiss()
  }

  resetScore(){

    this.presentAlert("Reset Score","Do you really want to reset your score account with "+this.count+" times clicked?")

  }

  toggle(){

    console.log(this.theme)

    switch(this.theme){
      case false: 
        localStorage.setItem('theme','true')

        console.log('light mode')
      break;
      case true:
        localStorage.setItem('theme','false')
        console.log('dark mode')
      break;
    }

  }

}
