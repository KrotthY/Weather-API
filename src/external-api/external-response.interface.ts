export interface WeatherResponse {
  address: string;
  timezone: string;
  days: DayWeather[];
}

export interface DayWeather {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  uvindex: number;
  conditions: string;
  description: string;
  icon: string;
}
