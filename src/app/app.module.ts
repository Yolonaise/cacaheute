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
import { MatDatepickerModule } from '@angular/material/datepicker';

// Animations module activation for material components.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// All services are here
import { GameService } from 'src/service/game.service';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/service/user.service';
import { NotificationService } from 'src/service/notification.service';
import { NavigationService } from 'src/service/nav.service';
import { OutlookService } from 'src/service/outlook.service';

import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameEditorComponent } from './gameEditor/game.editor.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { WeatherService } from 'src/service/weather.service';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    DashboardComponent,
    GameEditorComponent,
    UserEditorComponent
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
    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: ConnectionComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'game/:mode', component: GameEditorComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ])
  ],
  providers: [
    CacaheuteClient,
    GameService,
    NavigationService,
    CookieService,
    UserService,
    NotificationService,
    WeatherService,
    OutlookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
