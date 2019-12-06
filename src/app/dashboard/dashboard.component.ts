import { Component, OnInit } from '@angular/core';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import User from 'cacaheute-objects/models/cacaheute.user';
import Game from 'cacaheute-objects/models/cacaheute.game';
import { UserService } from 'src/service/user.service';
import { NotificationService } from 'src/service/notification.service';
import { WeatherService } from 'src/service/weather.service';
import { IResponse, Emojies } from 'src/banks/weather.banks';

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
    private client: CacaheuteClient,
    private user: UserService,
    private notif: NotificationService,
    private weather: WeatherService) { }

  async ngOnInit() {
    await this.weather.getWeather('liege');
    this.currentWeather = this.weather.getCurrentWeather();

    this.currentUser = await this.user.getUser();
    const resGs = await this.client.getGames(this.currentUser._id);
    if (resGs.statusCode > 299) {
      this.notif.showActSnack('An error occured when loading user !', 'Retry', async () => {
        await this.ngOnInit();
      });
    } else {
      (resGs as Game[]).forEach(g => {
        if (g.admin === this.currentUser._id) {
          this.userGames.push(g);
        }
        this.gamesOnGoing.push(g);
      });
    }
  }

  getWeatherIcon() {
    if (this.currentWeather) {
      return Emojies[this.currentWeather.weather[0].icon];
    }

    return '';
  }
}
