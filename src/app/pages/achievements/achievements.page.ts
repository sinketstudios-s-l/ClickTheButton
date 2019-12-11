import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})

@Injectable()

export class AchievementsPage implements OnInit {
  lastCount

  achievements = [
    {
      title: "Llega a 100",
      goal: 100,
      id: 1,
      reward: "something",
    },
    {
      title: "Llega a 200",
      goal: 200,
      id: 2,
      reward: "something",
    },
    {
      title: "Llega a 300",
      goal: 300,
      id: 3,
      reward: "something",
    },
    {
      title: "Llega a 400",
      goal: 400,
      id: 4,
      reward: "something",
    },
    {
      title: "Llega a 500",
      goal: 500,
      id: 5,
      reward: "something",
    },
    
  ]
  count: number;

  constructor() { }

  ngOnInit() {
    this.lastCount = localStorage.getItem('count')
    
    this.count = Number(this.lastCount)

    
    
    if(!this.lastCount){
      this.lastCount = 0
    }

    
    

  }


  counter(){  

    const a = ["s", "a", "r", "a", "n", "d", "o", "n", "g", "a"]

    console.log(JSON.parse((localStorage.getItem("somethg"))))


    this.count = this.count + 1



    localStorage.setItem('count', this.count.toString())

    this.lastCount = localStorage.getItem('count')




  }

  

}
