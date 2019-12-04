export interface IResponse {
    //coord?: ICoord;
    weather: IWeather[];
    base?: string;
    main?: IMain;
    // visibility: number;
    // wind ?: IWind;
    // clouds ?: ICloud;
    // rain ?: IRain;
    // snow ?: ISnow;
    dt: number;
    // sys ?: ISys;
    id?: string;
    name?: string;
}

// export interface ICoord {
//     lon?: number;
//     lat?: number;
// }

export interface IWeather {
    id?: string;
    main?: string;
    description?: string;
    icon?: string;
}

export interface IMain {
    temp?: number;
    pressure?: number;
    humidity?: number;
}

export const Emojies = {
    // DAY
    '01d': '☀️',
    '02d': '⛅',
    '03d': '☁️',
    '04d': '☁️☁️',
    '09d': '🌧️',
    '10d': '🌦️',
    '11d': '⛈️',
    '13d': '❄️',
    '50d': '🌫️',
    // NIGHT
    '01n': '🌜',
    '02n': '⛅',
    '03n': '☁️',
    '04n': '☁️☁️',
    '09n': '🌧️',
    '10n': '🌦️',
    '11n': '⛈️',
    '13n': '❄️',
    '50n': '🌫️',
};
