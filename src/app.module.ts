import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherServiceModule } from './weather-service/weather-service.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [WeatherServiceModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
