import { Injectable, HttpException } from '@nestjs/common';
import { User, IUser } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Token } from 'src/interfaces/token.interface';
import * as hash from 'hash.js';
import { JwtService } from '@nestjs/jwt';
import {validate} from "class-validator";

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
        private readonly jwtService: JwtService){}

    async signIn(user: User, res: any): Promise<any>{ //mongoose.Types.ObjectId(id)
        const password = hash.sha256().update(user.password).digest('hex');
        const findUser = await this.userModel.findOne({email: user.email, password: password}).exec();
        if(findUser){
            return await this.createToken({
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                password: findUser.password,
                email: findUser.email
            });
        } else {
            throw new HttpException("unknown", 400);
        }   
    }

    async signUp(user: IUser, res: any): Promise<User>{
        await validate(new User(user)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });
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

    async updateUser(id: string, user: IUser): Promise<User>{
        await validate(new User(user)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });

        if(this.validId(id)){
            const password = hash.sha256().update(user.password).digest('hex');
            const data = JSON.parse(JSON.stringify(user));
            data.password = password;
            await this.userModel.updateOne({_id: id},{$set: data});
            return await this.userModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        } 
    }

    async getAllUsers(query: any): Promise<User[]>{
        return await this.userModel.find().exec();
    }

    async deleteUser(id: string): Promise<any>{
        if(this.validId(id)){
            const status = await this.userModel.deleteOne({_id: id}).exec();
            if(status.n > 0){
                return Promise.resolve({message: "successful"});
            } else {
                throw new HttpException("unknown", 400);
            }
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async getUser(id: string): Promise<User>{
        if(this.validId(id)){
            return await this.userModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async findOneByToken(token: User): Promise<User>{
        return await this.userModel.findOne({email: token.email}).exec();
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }

    async createToken(user: User) {
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn: 360000000,
          accessToken,
        };
      }
}
