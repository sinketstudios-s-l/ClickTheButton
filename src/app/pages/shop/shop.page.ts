import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  routes
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.routes = [
      {
        id: 1,
        src: "../../assets/buttons/button.png",
        price: 0
      },
      {
        id: 2,
        src: "../../../assets/buttons/green-button.png",
        price: 200
      },
      {
        id: 3,
        src: "../../../assets/buttons/l-blue-button.png",
        price: 300
      },
      {
        id: 4,
        src: "../../assets/buttons/pink-button.png",
        price: 400
      },
      {
        id: 5,
        src: "../../assets/buttons/yellow-button.png",
        price: 500
      },
    ]

    var rand = Math.floor(this.routes.length * Math.random())

   
  }

  close(){
    this.modalCtrl.dismiss()
  }

}
