import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirPortController } from './air-port.controller';
import { AirPortService } from './air-port.service';
import { AirPortSchema } from 'src/schemas/airport.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'AirPort', schema: AirPortSchema }])],
    controllers: [AirPortController],
    providers: [AirPortService]
})
export class AirPortModule {}
