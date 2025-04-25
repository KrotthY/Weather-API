import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ExternalApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(city: string): Promise<any> {
    const baseUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKey = this.configService.get<string>('API_KEY');
    const url = `${baseUrl}/${city}?unitGroup=us&key=${apiKey}&contentType=json`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
