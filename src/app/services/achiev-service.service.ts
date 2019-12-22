import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AchievServiceService {

  constructor(
    private toastCtrl: ToastController
  ) { }


  async achiev(header:string, message:string, id:string) {

    const toast = await this.toastCtrl.create({
      header: header,
      message:'<ion-icon name="trophy"> '+ message,
      mode: "ios",
      animated: true,
      id: id,
      duration: 3000,
      position: "top",
      
    })

    await toast.present()

  }
}
