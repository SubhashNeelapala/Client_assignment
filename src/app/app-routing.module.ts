import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { PointsComponent } from './points/points.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'players',component:PlayersComponent},
  {path:'matches',component:MatchesComponent},
  {path:'winners',component:PointsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
