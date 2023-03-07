import { Injectable } from '@nestjs/common';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCityDto } from './dto/update-city';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly _cityRepository: Repository<City>,
  ) {}

  findAll(): Promise<City[]> {
    return this._cityRepository.find({
      relations: ['country'],
    });
  }

  findById(id: number): Promise<City> {
    return this._cityRepository.findOne({
      where: {
        id: id,
      },
      relations: ['country'],
    });
  }

  create(city: any): Promise<any> {
    return this._cityRepository.save(city);
  }

  update(id: number, city: UpdateCityDto): Promise<City> {
    return this._cityRepository.save({
      ...city,
      id,
    });
  }
}
