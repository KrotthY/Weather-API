import { Controller, Get, Query } from '@nestjs/common';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Controller('weather-service')
export class WeatherServiceController {
  constructor(private readonly apiService: ExternalApiService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    return this.apiService.getWeather(city);
  }
}
