import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  isSafeCity: boolean;
  @IsOptional()
  @IsDate()
  lastVisitDate: Date;
  @IsNotEmpty()
  @IsNumber()
  qtyVisits: number;
  @IsNotEmpty()
  @IsString()
  placesToVisit: string;
  @IsNotEmpty()
  @IsNumber()
  country: number;
}
