import { Component, OnInit } from '@angular/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import Game from 'cacaheute-objects/models/cacaheute.game';
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

  constructor(
    private user: UserService,
    private weather: WeatherService,
    private outlook: OutlookService) { }

  async ngOnInit() {
    this.currentWeather = await this.weather.getWeather('liege');
    this.currentUser = await this.user.getUser();
  }

  getWeatherIcon() {
    if (this.currentWeather) {
      return Emojies[this.currentWeather.weather[0].icon];
    }

    return '';
  }

  async register() {
    const me = await this.outlook.getMe();
    const tasks = await this.outlook.getTasks();
    
    tasks.forEach((v, i) => {
      console.log(v.subject);
    });
  }

  unRegister() {
  }
}
