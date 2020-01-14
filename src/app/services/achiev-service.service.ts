import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AchievServiceService {
  achievements = [
    {
      title: "Reaches 100",
      goal: 100,
      id: 1,
      reward: "something",
    },
    {
      title: "Reaches 200",
      goal: 200,
      id: 2,
      reward: "something",
    },
    {
      title: "Reaches 300",
      goal: 300,
      id: 3,
      reward: "something",
    },
    {
      title: "Reaches 400",
      goal: 400,
      id: 4,
      reward: "something",
    },
    {
      title: "Reaches 500",
      goal: 500,
      id: 5,
      reward: "something",
    },
    {
      title: "Unlock leaderboard",
      goal: 501,
      id: 5,
      reward: "something",
    },
    
  ]
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
