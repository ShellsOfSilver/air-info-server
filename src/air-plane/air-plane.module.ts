import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirPlaneSchema } from 'src/schemas/airplane.schema';
import { AirPlaneController } from './air-plane.controller';
import { AirPlaneService } from './air-plane.service';
import { AirLineSchema } from 'src/schemas/airline.schema';
import { AirCompanySchema } from 'src/schemas/air-company.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'AirPlane', schema: AirPlaneSchema }]),
              MongooseModule.forFeature([{ name: 'AirCompany', schema: AirCompanySchema }]),
              MongooseModule.forFeature([{ name: 'AirLine', schema: AirLineSchema }])],
    controllers: [AirPlaneController],
    providers: [AirPlaneService]
})
export class AirPlaneModule {}
