import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirCompanySchema } from 'src/schemas/air-company.schema';
import { AirCompanyController } from './air-company.controller';
import { AirCompanyService } from './air-company.service';
import { AirLineSchema } from 'src/schemas/airline.schema';
import { AirPortSchema } from 'src/schemas/airport.schema';
import { AirPlaneSchema } from 'src/schemas/airplane.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'AirCompany', schema: AirCompanySchema }]),
    MongooseModule.forFeature([{ name: 'AirLine', schema: AirLineSchema }]),
    MongooseModule.forFeature([{ name: 'AirPlane', schema: AirPlaneSchema }]),
    MongooseModule.forFeature([{ name: 'AirPort', schema: AirPortSchema }])],
    controllers: [AirCompanyController],
    providers: [AirCompanyService]
})
export class AirCompanyModule {}