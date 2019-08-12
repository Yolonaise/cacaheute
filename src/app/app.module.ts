import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//All materials components imports are here !
import { MatButtonModule } from "@angular/material/button"

//Animations module activation for material components.
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
