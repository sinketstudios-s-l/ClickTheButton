import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  main
  sub

  perMain
  perSub

  btnList:any[] = []
  perList:any[] = []
  routes

  uid = localStorage.getItem('uid')
  constructor(
    private modalCtrl: ModalController,
    private afs: AngularFirestore
  ) { 

    this.main = afs.collection('store')
    this.sub = this.main.valueChanges().subscribe( e => {
      this.btnList = e
      console.log(this.btnList)
    })

    this.perMain = afs.doc(`users/${this.uid}`)
    this.perSub = this.perMain.valueChanges().subscribe( e => {
      this.perList = e['btns']
      console.log(this.perList)
    })

  }

  ngOnInit() {

    var rand = Math.floor(this.btnList.length * Math.random())
   
  }

  close(){
    this.modalCtrl.dismiss()
  }


  buy(e){

    console.log(e.target.id)
    var id = e.target.id
    var storage = localStorage.getItem('bought')

    var array = [JSON.parse(storage) + id]
  
    localStorage.setItem('bought', JSON.stringify(array))

    
    console.log(JSON.parse(storage))
  }


}
