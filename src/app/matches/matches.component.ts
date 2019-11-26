import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ApiservicesService} from '../services/apiservies';
import {Subject} from 'rxjs'
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  team_list_a:any;team_list_b:any;
  team_a:any="";team_b:any="";matches_list:any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private http:HttpClient,private apiservices:ApiservicesService) { }

  ngOnInit() {
    this.getAllTeams()
    this.getAllMatchesList()
  }
  getAllTeams(){
    this.apiservices.getAllTeams().subscribe((res:any)=>{
      if(res.success){
        this.team_list_a =this.team_list_b = res['data']
      }
      else{
        alert(res.errors.message)
      }
    })
  }
  createMatch(){
    if(this.team_a == this.team_b){
      return alert(`Please select Different Teams`)
    }
    else{
      let kwargs={
        "contestant1" : this.team_a,
			"contestant2" : this.team_b
      }
      this.apiservices.createMatch(kwargs).subscribe((res:any)=>{
        if(res.success){
          alert(res.message)
          this.getAllMatchesList()
          this.team_a = this.team_b = ''
        } else{
          alert(res.errors.message)
        }
      })
    }
  }
  getAllMatchesList(){
    this.apiservices.getAllMatches().subscribe((res:any)=>{
      if(res.success){
        if((res.data).length>0){
          this.matches_list = res.data
          this.dtTrigger.next()
        } else{
          alert(res.message)
        }
      }else{
        alert(res.errors.message)
      }
    })
  }


}
