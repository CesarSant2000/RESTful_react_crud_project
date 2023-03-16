import { CityInterface } from '@/interfaces/city';

export interface CountryInterface {
  id: number;
  name: string;
  continent: string;
  officialCoin: string;
  isCountryVisitedMultipleTimes: boolean;
  qtyCitiesToVisit: number;
  visitedCities?: CityInterface[];
}