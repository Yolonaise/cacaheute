import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

// All materials components imports are here !
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Animations module activation for material components.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// All services are here
import { GameService } from 'src/service/game.service';
import { CacaheuteClient } from 'src/client/cacaheute.client';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationService } from 'src/service/nav.service';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatTooltipModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: ConnectionComponent },
      { path: 'dashboard/:id', component: DashboardComponent },
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
    ])
  ],
  providers: [
    CacaheuteClient,
    GameService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
