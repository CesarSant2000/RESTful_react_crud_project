import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country';
import { UpdateCountryDto } from './dto/update-country';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly _countryRepository: Repository<Country>,
  ) {}

  findAll(): Promise<Country[]> {
    return this._countryRepository.find({
      relations: ['visitedCities'],
    });
  }

  findOneById(id: number): Promise<Country> {
    return this._countryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['visitedCities'],
    });
  }

  create(country: CreateCountryDto): Promise<Country> {
    return this._countryRepository.save(country);
  }

  update(id: number, country: UpdateCountryDto): Promise<Country> {
    return this._countryRepository.save({
      ...country,
      id,
    });
  }
}
