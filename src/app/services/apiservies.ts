
import { Injectable } from '@angular/core/'; 
 // import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { BehaviorSubject } from 'rxjs';

 import { HttpClientModule, HttpClient }    from '@angular/common/http';
 import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';
@Injectable()
export class ApiservicesService {
  sharedata:any;
  headers = new Headers();

  url="http://localhost:8005/"
  private messageSource = new BehaviorSubject<any>('');
  currentMessage = this.messageSource.asObservable();

  constructor(public http:HttpClient) { 
    this.headers.append('Access-Control-Allow-Origin','*'  )
    console.clear();console.log(this.headers)
  }
//   teamRegistration(data):any{
//       return this._esubheaderservice.apipostData(``,data)
//   }
  getAllTeams(){
     return this.http.get(this.url+`team/create`)
  }
  saveUserData(data:any){
    return this.http.post(this.url+`team/create`,data)
  }
  savePlayersData(data:any){
    return this.http.post(this.url+`player/create`,data)
  }
  getPlayersByTeam(id:number){
    return this.http.get(this.url+`player/by/team/${id}`)
  }
  createMatch(data:any){
    return this.http.post(this.url+`match/fixtures`,data)
  }
  getAllMatches(){
    return this.http.get(this.url+`match_list`)
  }
  matchDataSave(data){
    return this.http.post(this.url+`create/points/winner`,data)
  }
  getWinnersList(){
    return this.http.get(this.url+`get/points/winner`)
  }
}
