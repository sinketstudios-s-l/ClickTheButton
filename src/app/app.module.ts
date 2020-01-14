import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SettingsPageModule } from './settings/settings.module';

import { AdMobFree } from '@ionic-native/admob-free/ngx'
import { AdMobFreeService } from './services/ad-mob-free.service';

// Firebase

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { ShopPageModule } from './pages/shop/shop.module';
import { UserService } from './services/user.service';
import { InfoPageModule } from './pages/info/info.module';
import { AchievServiceService } from './services/achiev-service.service';
import { SplashPageModule } from './pages/splash/splash.module';

var firebaseConfig = {
  apiKey: "AIzaSyDpjocgE3TOfWPCCHVJRyNgYlEuoa84Ab4",
  authDomain: "clickthebutton-ss.firebaseapp.com",
  databaseURL: "https://clickthebutton-ss.firebaseio.com",
  projectId: "clickthebutton-ss",
  storageBucket: "clickthebutton-ss.appspot.com",
  messagingSenderId: "654971086995",
  appId: "1:654971086995:web:b85b0d0ddea6a5c20c0566",
  measurementId: "G-7QGR675H13"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    SettingsPageModule,
    ShopPageModule,
    InfoPageModule,
    SplashPageModule,
  ],
  providers: [
    Vibration,
    NativeAudio,
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdMobFreeService,
    UserService,
    AchievServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
