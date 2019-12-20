import { Component, OnInit } from '@angular/core';
import { IResponse, Emojies } from 'src/banks/weather.banks';
import { WeatherService } from 'src/service/weather.service';

@Component({
  selector: 'app-main-meteo',
  templateUrl: './main-meteo.component.html',
  styleUrls: ['./main-meteo.component.scss']
})
export class MainMeteoComponent implements OnInit {
  currentWeather: IResponse;

  constructor(private weather: WeatherService) { }

  async ngOnInit() {
    this.currentWeather = await this.weather.getWeather('liege');
  }

  getWeatherIcon() {
    if (this.currentWeather) {
      return Emojies[this.currentWeather.weather[0].icon];
    }
    return '';
  }
}
