import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { City } from '../../city/city.entity'

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  continent: string;
  @IsNotEmpty()
  @IsString()
  officialCoin: string;
  @IsBoolean()
  @IsNotEmpty()
  isCountryVisitedMultipleTimes: boolean;
  @IsNotEmpty()
  qtyCitiesToVisit: number;
  visitedCities: City[];
}
