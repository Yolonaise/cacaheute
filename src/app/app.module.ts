import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule, Routes, Router } from '@angular/router';

// All materials components imports are here !
import { MatButtonModule } from '@angular/material/button';

// Animations module activation for material components.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// All services are here
import { CacaheuteClient } from 'src/client/cacaheute.client';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/service/user.service';
import { NotificationService } from 'src/service/notification.service';
import { NavigationService } from 'src/service/nav.service';
import { OutlookService } from 'src/service/outlook.service';
import { ProgressService } from 'src/service/progress.service';
import { WeatherService } from 'src/service/weather.service';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressInterceptor } from 'src/interceptors/progress.interceptor';
import { MainTasksComponent } from './main-tasks/main-tasks.component';
import { FolderComponent } from './folder/folder.component';
import { MainMeteoComponent } from './main-meteo/main-meteo.component';
import { MainMaterialExport } from 'src/material/materialImport';
import { TaskTileComponent } from './main-tasks/task-tile/task-tile.component';
import { TaskOptionComponent } from './main-tasks/task-option/task-option.component';
import { ActionService } from 'src/service/action.service';
import { FeatureComponent } from './feature/feature.component';

const routes: Routes = [
  { path: 'login', component: ConnectionComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    DashboardComponent,
    FolderComponent,
    MainMeteoComponent,
    TaskTileComponent,
    TaskOptionComponent,
    MainTasksComponent,
    FeatureComponent,
  ],
  entryComponents: [
    MainTasksComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainMaterialExport,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true },
    CacaheuteClient,
    CookieService,
    NavigationService,
    UserService,
    NotificationService,
    WeatherService,
    OutlookService,
    ProgressService,
    ActionService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
