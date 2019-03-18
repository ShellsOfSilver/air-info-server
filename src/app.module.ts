import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirPlaneModule } from './air-plane/air-plane.module';
import { AirCompanyModule } from './air-company/air-company.module';
import { AirLineModule } from './air-line/air-line.module';
import { AirPortModule } from './air-port/air-port.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AirPlaneModule, 
    AirCompanyModule, 
    AirLineModule, 
    AirPortModule, 
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/airInfo', { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
