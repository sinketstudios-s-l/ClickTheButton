import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashPage } from './pages/splash/splash.page';
import { delay } from 'q';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController

  ) {

    splashScreen.hide()
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const modal = await this.modalCtrl.create({
        component: SplashPage,
        animated: false
      })

      await modal.present().then(()=> {
        delay(3750).then(()=>{
          this.modalCtrl.dismiss()
        })
      })


    });
  }
}
