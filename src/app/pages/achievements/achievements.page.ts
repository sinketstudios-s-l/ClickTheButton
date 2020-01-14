import { Component, OnInit, Injectable } from '@angular/core';
import { AchievServiceService } from 'src/app/services/achiev-service.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    
    {
      title: "Reaches 1000",
      goal: 1000,
      id: 6,
      reward: "something",
    },
    {
      title: "Reaches 1200",
      goal: 1200,
      id: 7,
      reward: "something",
    },
    {
      title: "Reaches 1300",
      goal: 1300,
      id: 8,
      reward: "something",
    },
    {
      title: "Reaches 1400",
      goal: 1400,
      id: 9,
      reward: "something",
    },
    {
      title: "Reaches 1500",
      goal: 1500,
      id: 10,
      reward: "something",
    },
    {
      title: "Reaches 2000",
      goal: 2000,
      id: 11,
      reward: "something",
    },
    {
      title: "Reaches 2500",
      goal: 2500,
      id: 12,
      reward: "something",
    },
    {
      title: "Reaches 3000",
      goal: 3000,
      id: 13,
      reward: "something",
    },
    {
      title: "Reaches 3500",
      goal: 3500,
      id: 14,
      reward: "something",
    },
    {
      title: "Reaches 4000",
      goal: 4000,
      id: 15,
      reward: "something",
    },
  ]

  count: number;

  constructor(private achvSvc: AchievServiceService, private afs: AngularFirestore) { }

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
