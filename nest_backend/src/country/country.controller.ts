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
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country';
import { validate } from '@nestjs/class-validator';
import { UpdateCountryDto } from './dto/update-country';

@Controller('country')
export class CountryController {
  constructor(private readonly _countryService: CountryService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this._countryService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this._countryService.findOneById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() country: any) {
    const newCountry = new CreateCountryDto();
    newCountry.name = country.name;
    newCountry.continent = country.continent;
    newCountry.officialCoin = country.officialCoin;
    newCountry.isCountryVisitedMultipleTimes =
      country.isCountryVisitedMultipleTimes;
    newCountry.qtyCitiesToVisit = country.qtyCitiesToVisit;
    const errors = await validate(newCountry);
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException({
        mensaje: 'Datos incorrectos',
      });
    }
    return this._countryService.create(newCountry);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Body() country: any, @Param('id', ParseIntPipe) id: number) {
    const modifiedCountry = new UpdateCountryDto();
    modifiedCountry.name = country.name;
    modifiedCountry.continent = country.continent;
    modifiedCountry.officialCoin = country.officialCoin;
    modifiedCountry.isCountryVisitedMultipleTimes =
      country.isCountryVisitedMultipleTimes;
    modifiedCountry.qtyCitiesToVisit = country.qtyCitiesToVisit;
    const errors = await validate(modifiedCountry);
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException({
        mensaje: 'Datos incorrectos',
      });
    }
    return this._countryService.update(id, modifiedCountry);
  }
}
