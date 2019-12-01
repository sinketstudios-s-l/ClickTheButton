import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  date = new Date().getFullYear()
  version = "Beta v.0.1.453ab"
  
  lastCount
  count:number = 0
  constructor() {

    this.lastCount = localStorage.getItem('count')

    this.count = Number(this.lastCount)

  }


  counter(){

    this.count = this.count + 1

    localStorage.setItem('count', this.count.toString())

    this.lastCount = localStorage.getItem('count')
  }

}
