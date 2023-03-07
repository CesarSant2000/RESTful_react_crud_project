import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city';
import { validate } from '@nestjs/class-validator';
import { UpdateCityDto } from './dto/update-city';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() city: any) {
    const newCity = new CreateCityDto();
    newCity.name = city.name;
    newCity.isSafeCity = city.isSafeCity;
    newCity.lastVisitDate = city.lastVisitDate;
    newCity.placesToVisit = city.placesToVisit;
    newCity.qtyVisits = city.qtyVisits;
    newCity.country = city.country;
    const errors = await validate(newCity);
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException({
        mensaje: 'Datos incorrectos',
      });
    }
    return this.cityService.create(city);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Body() city: any, @Param('id', ParseIntPipe) id: number) {
    const modifiedCity = new UpdateCityDto();
    modifiedCity.name = city.name;
    modifiedCity.isSafeCity = city.isSafeCity;
    modifiedCity.lastVisitDate = city.lastVisitDate;
    modifiedCity.placesToVisit = city.placesToVisit;
    modifiedCity.qtyVisits = city.qtyVisits;
    const errors = await validate(modifiedCity);
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException({
        mensaje: 'Datos incorrectos',
      });
    }
    return this.cityService.update(id, city);
  }
}
