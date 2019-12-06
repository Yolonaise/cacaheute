import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IResponse, Emojies } from 'src/banks/weather.banks';

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const OPEN_WEATHER_KEY = '8e5d28fb92e3901b49bb11069943404d';
const OPEN_WEATHER_METRICS = 'metric';
const OPEN_WEATHER_LANG = 'fr';

export class WeatherService {
    private currentWeather: IResponse;

    constructor(private http: HttpClient) { }

    async getWeather(city: string): Promise<any> {
        try {
            this.currentWeather = await this.http.get(
                `${OPEN_WEATHER_URL}${city}&APPID=${OPEN_WEATHER_KEY}&units=${OPEN_WEATHER_METRICS}&lang=${OPEN_WEATHER_LANG}`
            ).toPromise() as IResponse;
        } catch (err) {
            catchError(this.handleError('getWeather', []));
            return {};
        }
    }

    getCurrentWeather(): IResponse | null {
        return this.currentWeather;
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
