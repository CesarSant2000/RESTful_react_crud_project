import { CountryInterface } from '@/interfaces/country';

export interface CityInterface {
    id: number;
    name: string;
    isSafeCity: boolean;
    lastVisitDate: Date;
    qtyVisits: number;
    placesToVisit: string;
    country?: CountryInterface | number;
}