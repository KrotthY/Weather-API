import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { DayWeather, WeatherResponse } from './external-response.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExternalApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getWeather(
    city: string,
    date1: string,
    date2: string,
  ): Promise<WeatherResponse> {
    const cacheKey = `weather-key:${city}/${date1}/${date2}`;
    const cached = await this.cacheManager.get<WeatherResponse>(cacheKey);
    if (cached) {
      console.log('cached');
      return cached;
    }

    console.log(' normal');
    const baseUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKey = this.configService.get<string>('API_KEY');
    const url = `${baseUrl}/${city}/${date1}/${date2}?unitGroup=us&key=${apiKey}&contentType=json`;
    const response = await firstValueFrom(
      this.httpService.get<WeatherResponse>(url),
    );
    const data = response.data;

    const simplifiedResponse = {
      address: data.address,
      timezone: data.timezone,
      days: data.days.map((day: DayWeather) => ({
        datetime: day.datetime,
        tempmax: day.tempmax,
        tempmin: day.tempmin,
        temp: day.temp,
        uvindex: day.uvindex,
        conditions: day.conditions,
        description: day.description,
        icon: day.icon,
      })),
    };

    await this.cacheManager.set(cacheKey, simplifiedResponse);
    return simplifiedResponse;
  }
}
