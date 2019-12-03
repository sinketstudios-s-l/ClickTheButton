import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  count
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.count = localStorage.getItem('count')
    this.count = Number(this.count)
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

    this.presentAlert("Reset Account","Do you really want to reset your account with "+this.count+" times clicked?")


  }

}
