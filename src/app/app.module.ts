import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//All materials components imports are here !
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

//Animations module activation for material components.
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
