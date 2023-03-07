import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from './country/country.entity'
import { City } from './city/city.entity'
import { CityModule } from './city/city.module'
import { CountryModule } from './country/country.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './BD/country_db.sqlite',
      entities: [City, Country],
      synchronize: true,
      dropSchema: false,
    }),
    CityModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
