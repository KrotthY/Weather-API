import { Module } from '@nestjs/common';
import { WeatherServiceService } from './weather-service.service';
import { WeatherServiceController } from './weather-service.controller';
import { ExternalApiModule } from 'src/external-api/external-api.module';
@Module({
  imports: [ExternalApiModule],
  controllers: [WeatherServiceController],
  providers: [WeatherServiceService],
})
export class WeatherServiceModule {}
