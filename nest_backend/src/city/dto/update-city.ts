import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsBoolean()
  isSafeCity: boolean;
  @IsOptional()
  @IsDate()
  lastVisitDate: Date;
  @IsOptional()
  @IsNumber()
  qtyVisits: number;
  @IsOptional()
  @IsString()
  placesToVisit: string;
}
