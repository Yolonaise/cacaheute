import { Component, OnInit } from '@angular/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { UserService } from 'src/service/user.service';
import { WeatherService } from 'src/service/weather.service';
import { IResponse, Emojies } from 'src/banks/weather.banks';
import { OutlookService } from 'src/service/outlook.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  currentUser: User;
  currentWeather: IResponse;
  me: MicrosoftGraphBeta.User;
  tasks: MicrosoftGraphBeta.OutlookTask[];

  constructor(
    private user: UserService,
    private weather: WeatherService,
    private outlook: OutlookService) { }

  async ngOnInit() {
    this.currentWeather = await this.weather.getWeather('liege');
    this.currentUser = await this.user.getUser();
    await this.register();
  }

  getWeatherIcon() {
    if (this.currentWeather) 
      return Emojies[this.currentWeather.weather[0].icon];

    return '';
  }

  async register() {
    this.me = await this.outlook.getMe();
  }

  unRegister() {
  }
}
