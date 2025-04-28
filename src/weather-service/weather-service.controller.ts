import { Controller, Get, Query } from '@nestjs/common';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Controller('weather-service')
export class WeatherServiceController {
  constructor(private readonly apiService: ExternalApiService) {}

  @Get()
  async getWeather(
    @Query('city') city: string,
    @Query('date1') date1: string,
    @Query('date2') date2: string,
  ) {
    return this.apiService.getWeather(city, date1, date2);
  }
}
