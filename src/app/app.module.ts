import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule, Routes, Router } from '@angular/router';

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
import { MatGridListModule } from '@angular/material/grid-list';

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
import { MatNativeDateModule } from '@angular/material/core';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressInterceptor } from 'src/interceptors/progress.interceptor';
import { MainTasksComponent } from './main-tasks/main-tasks.component';
import { FolderComponent } from './folder/folder.component';
import { MainMeteoComponent } from './main-meteo/main-meteo.component';
import { MainMaterialExport } from 'src/material/materialImport';
import { TaskTileComponent } from './main-tasks/task-tile/task-tile.component';
import { TaskOptionComponent } from './main-tasks/task-option/task-option.component';

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
    MainTasksComponent,
    FolderComponent,
    MainMeteoComponent,
    TaskTileComponent,
    TaskOptionComponent,
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
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
