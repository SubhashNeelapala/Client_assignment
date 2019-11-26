import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../services/apiservies';
import { Subject } from 'rxjs';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userslist:any;
  formData = new FormData()
  dtOptions: any;
  playersList:any;
  imageurl:any
  name:any;logo:any;club_state:any
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  constructor(private apiservices:ApiservicesService) { 
    this.imageurl =this.apiservices.url
  }
  
  ngOnInit() {
    this.getAllTeams()
  }
  addFile(event): void {

    const fileList: FileList = event.target.files;
      const file = fileList[0];
      this.formData.append('image', file, file.name);
  }
  getAllTeams(){
    this.apiservices.getAllTeams().subscribe((res)=>{
      this.userslist = res['data']
      this.dtTrigger.next();

      console.log(res)})
  }
  addTeam(){
   
    jQuery('#showTeamModel').modal('show');
  }
  saveData(){
    if(this.name == '' || this.name==undefined){
     return alert(`please enter name of the team`)
    }
    if(this.club_state == '' || this.club_state==undefined){
      return alert(`please enter name of the club_state`)
    }

    let kwargs:any = {
      "name":this.name,
      "club_state":this.club_state
    }
    this.formData.append('data',JSON.stringify(kwargs))
    console.clear();console.log(kwargs)
    this.apiservices.saveUserData(this.formData).subscribe((res:any)=>{
      console.log(res)
      if(res.success){
        this.name = this.club_state = ""
        alert(res.message)
        jQuery('#showTeamModel').modal('hide')
        this.getAllTeams()
      }
      else{
        alert(res.errors.message)
      }
    })

  }
  showpopup(id){
    this.getPlayersByTeam(id)
  }
  getPlayersByTeam(id:number){
    this.apiservices.getPlayersByTeam(id).subscribe((res:JSON)=>{
      if(res['success']){
        if((res['data']).length>0){
          jQuery('#showPlayers').modal('show')
          this.playersList = res['data']
          console.log(res)
          this.dtTrigger1.next()
        }
        else{
          alert(`No Players Available for this Team`)
        }

      }
    })
  }

}
