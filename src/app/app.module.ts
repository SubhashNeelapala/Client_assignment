import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component'
import { HttpClientModule }    from '@angular/common/http';
import { ApiservicesService } from './services/apiservies';
import { DataTablesModule } from 'angular-datatables';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { CommonComponent } from './common/common.component';
import { PointsComponent } from './points/points.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayersComponent,
    MatchesComponent,
    CommonComponent,
    PointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    DataTablesModule,


  ],
  providers: [ApiservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
