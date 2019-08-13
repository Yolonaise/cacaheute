import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//All materials components imports are here !
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from '@angular/material/progress-bar';

//Animations module activation for material components.
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//All services are here
import { GameService } from "../serivces/game.service";

import { AppComponent } from './app.component';
import { CreateGameComponent } from './create-game/create-game.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
