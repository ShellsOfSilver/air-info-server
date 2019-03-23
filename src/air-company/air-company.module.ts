import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirCompanySchema } from 'src/schemas/air-company.schema';
import { AirCompanyController } from './air-company.controller';
import { AirCompanyService } from './air-company.service';
import { AirLineSchema } from 'src/schemas/airline.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'AirCompany', schema: AirCompanySchema }]),
    MongooseModule.forFeature([{ name: 'AirLine', schema: AirLineSchema }])],
    controllers: [AirCompanyController],
    providers: [AirCompanyService]
})
export class AirCompanyModule {}