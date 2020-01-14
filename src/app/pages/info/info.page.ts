import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  id
  constructor(
    private params: NavParams,
    private popOverCtrl: PopoverController
  ) { }

  ngOnInit() {

    this.id = this.params.get('id')



  }


  close(){
    this.popOverCtrl.dismiss()
  }

}
