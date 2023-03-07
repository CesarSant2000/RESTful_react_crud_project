import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  continent: string;
  @IsOptional()
  @IsString()
  officialCoin: string;
  @IsBoolean()
  @IsOptional()
  isCountryVisitedMultipleTimes: boolean;
  @IsOptional()
  @IsInt()
  qtyCitiesToVisit: number;
}
