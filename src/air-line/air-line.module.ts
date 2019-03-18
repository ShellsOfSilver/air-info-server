import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirLineController } from './air-line.controller';
import { AirLineService } from './air-line.service';
import { AirLineSchema } from 'src/schemas/airline.schema';
import { AirPortSchema } from 'src/schemas/airport.schema';
import { AirCompanySchema } from 'src/schemas/air-company.schema';
import { AirPlaneSchema } from 'src/schemas/airplane.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'AirLine', schema: AirLineSchema }]),
    MongooseModule.forFeature([{ name: 'AirPlane', schema: AirPlaneSchema }]),
    MongooseModule.forFeature([{ name: 'AirCompany', schema: AirCompanySchema }]),
    MongooseModule.forFeature([{ name: 'AirPort', schema: AirPortSchema }])],
    controllers: [AirLineController],
    providers: [AirLineService]
})
export class AirLineModule {}
