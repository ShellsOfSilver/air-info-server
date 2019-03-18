import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirPlaneSchema } from 'src/schemas/airplane.schema';
import { AirPlaneController } from './air-plane.controller';
import { AirPlaneService } from './air-plane.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'AirPlane', schema: AirPlaneSchema }])],
    controllers: [AirPlaneController],
    providers: [AirPlaneService]
})
export class AirPlaneModule {}
