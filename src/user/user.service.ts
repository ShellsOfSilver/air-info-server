import { Injectable, HttpStatus, UnauthorizedException, HttpException } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/interfaces/token.interface';
import * as hash from 'hash.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
        private readonly jwtService: JwtService){}

    async signIn(user: User, res: any): Promise<User>{ //mongoose.Types.ObjectId(id)
        return await this.userModel.find(/*{id: id}*/).exec();
    }

    async signUp(user: User, res: any): Promise<User>{
        const userDb = await this.userModel.findOne({email: user.email}).exec();
        if(userDb === null){
            const newUser = JSON.parse(JSON.stringify(user));
            newUser.password = hash.sha256().update(newUser.password).digest('hex');
            const createdUser = new this.userModel(newUser);
            const saveUser = await createdUser.save();
            const token = await this.createToken(newUser);
            const createdToken = new this.tokenModel({idUser: saveUser._id, accessToken: token.accessToken});
            return await createdToken.save();
        }else{
            throw new HttpException("user is already exist", 409);
        }
    }

    async updateUser(id, data): Promise<User>{
        return await this.userModel.updateOne({id: id},{$set: data});
    }

    async getAllUsers(query: any): Promise<User[]>{
        return await this.userModel.find().exec();
    }

    async deleteUser(id){
        return await this.userModel.find().exec();
    }

    async getUser(id){
        return await this.userModel.find().exec();
    }

    async findOneByToken(token): Promise<User>{
        return await this.userModel.findOne({email: token.email}).exec();
    }

    async createToken(user: User) {
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn: 360000000,
          accessToken,
        };
      }
}
