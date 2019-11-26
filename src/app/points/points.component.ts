import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs'
import {ApiservicesService} from '.././services/apiservies'
@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  matches_list:any;
  match="";team1="";team2="";team="";
  userslist:any;winners_list:any
  constructor(private apiservices:ApiservicesService) { }


  ngOnInit() {
    this.getAllMatchesList()
    this.getAllTeams();this.getWinnersList()
  }
  getAllMatchesList(){
    this.apiservices.getAllMatches().subscribe((res:any)=>{
      if(res.success){
        if((res.data).length>0){
          this.matches_list = res.data
        } else{
          alert(res.message)
        }
      }else{
        alert(res.errors.message)
      }
    })
  }
  getAllTeams(){
    this.apiservices.getAllTeams().subscribe((res)=>{
      this.userslist = res['data']

      console.log(res)})
  }
  matchDataSave(){
    let kwargs={
      "match":this.match,
			"winner":this.team,
			"contestant1_points":this.team1,
			"contestant2_points":this.team2
    }
    this.apiservices.matchDataSave(kwargs).subscribe((res:any)=>{
      if(res.success){
        alert(res.message)
        this.getWinnersList()
        this.team =this.team1 =this.team2 = this.match =""
      }
    })
  }

  getWinnersList(){
    this.apiservices.getWinnersList().subscribe((res:any)=>{
      if(res.success){
        this.winners_list = res.data
        this.dtTrigger.next()

      }
    })
  }
}
