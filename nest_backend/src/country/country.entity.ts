import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../city/city.entity';

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        length: 50,
        type: 'varchar',
    })
    name: string
    @Column({
        length: 50,
        type: 'varchar',
    })
    continent: string
    @Column({
        length: 50,
        type: 'varchar',
    })
    officialCoin: string
    @Column({
        type: 'boolean',
        name: 'is_country_visited_multiple_times',
    })
    isCountryVisitedMultipleTimes: boolean
    @Column({
        type: 'int',
        name: 'qty_cities_to_visit',
    })
    qtyCitiesToVisit: number
    @OneToMany(
        () => City,
        (city) => city.country,
        {
            onDelete: 'SET NULL',
        }
    )
    visitedCities: City[]
}
