import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';

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
  @IsInt()
  qtyCitiesToVisit: number;
}
