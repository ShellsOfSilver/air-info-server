import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirPortController } from './air-port.controller';
import { AirPortService } from './air-port.service';
import { AirPortSchema } from 'src/schemas/airport.schema';
import { AirCompanySchema } from 'src/schemas/air-company.schema';
import { AirLineSchema } from 'src/schemas/airline.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'AirPort', schema: AirPortSchema }]),
    MongooseModule.forFeature([{ name: 'AirCompany', schema: AirCompanySchema }]),
    MongooseModule.forFeature([{ name: 'AirLine', schema: AirLineSchema }])],
    controllers: [AirPortController],
    providers: [AirPortService]
})
export class AirPortModule {}
