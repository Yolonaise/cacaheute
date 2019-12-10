import { Component, OnInit } from '@angular/core';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import User from 'cacaheute-objects/models/cacaheute.user';
import Game from 'cacaheute-objects/models/cacaheute.game';
import { UserService } from 'src/service/user.service';
import { NotificationService } from 'src/service/notification.service';
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
  gamesClosed: Game[] = [];
  gamesOnGoing: Game[] = [];
  userGames: Game[] = [];

  currentWeather: IResponse;

  constructor(
    private user: UserService,
    private weather: WeatherService,
    private outlook: OutlookService) { }

  async ngOnInit() {
    this.currentWeather = await this.weather.getWeather('liege');
    this.currentUser = await this.user.getUser();

    this.outlook.configure();
    console.log(this.outlook.getAccessToken());
  }

  getWeatherIcon() {
    if (this.currentWeather) {
      return Emojies[this.currentWeather.weather[0].icon];
    }

    return '';
  }

  register() {
    this.outlook.register();
  }

  unRegister() {
    this.outlook.unRegister();
  }

  identity() {
    const claims = this.outlook.getIdentityClaims();
    console.log(claims);
  }
}
