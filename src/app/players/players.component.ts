import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../services/apiservies';
import { Subject } from 'rxjs';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  teamList:any;
  formData = new FormData()
  dtOptions: any;
  first_name:any;last_name:any;player_jersey_no:any;player_country:any;team:any;file:any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private apiservices:ApiservicesService) { }

  ngOnInit() {
    this.teamRegistration()
  }
  addFile(event): void {

    const fileList: FileList = event.target.files;
      const file = fileList[0];
      this.formData.append('image', file, file.name);
  }
  teamRegistration(){
    this.apiservices.getAllTeams().subscribe((res)=>{
      this.teamList = res['data']
      this.dtTrigger.next();

      console.log(res)})
  }
  addPlayer(){
    this.team = this.file = this.first_name = this.last_name = this.player_jersey_no = this.player_country =""
   
    jQuery('#showPlayerModel').modal('show');
  }
  savePlayerData(){
    // if(this.name == '' || this.name==undefined){
    //  return alert(`please enter name of the team`)
    // }
    // if(this.club_state == '' || this.club_state==undefined){
    //  return alert(`please enter name of the club_state`)
    // }
 

    let kwargs:any = {
      "firstname":this.first_name,
      "lastname":this.last_name,
      "jersey_no":this.player_jersey_no,
      "country":this.player_country,
      "team_id":this.team
    }
    this.formData.append('data',JSON.stringify(kwargs))
    console.clear();console.log(kwargs)
    this.apiservices.savePlayersData(this.formData).subscribe((res:any)=>{
      console.log(res)
      if(res.success){
        // this.name = this.club_state = ""
        alert(res.message)
        jQuery('#showPlayerModel').modal('hide')
      }
      else{
        alert(res.errors.message)
      }
    })

  }

}
