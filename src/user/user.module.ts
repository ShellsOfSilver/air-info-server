import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { TokenSchema } from 'src/schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
        JwtModule.register({
            secretOrPrivateKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            signOptions: {
              expiresIn: 360000000,
            },
          }),],
    controllers: [UserController],
    providers: [UserService, AuthService, HttpStrategy], 
})
export class UserModule {}
