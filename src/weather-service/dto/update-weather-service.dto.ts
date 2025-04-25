import { PartialType } from '@nestjs/mapped-types';
import { CreateWeatherServiceDto } from './create-weather-service.dto';

export class UpdateWeatherServiceDto extends PartialType(CreateWeatherServiceDto) {}
