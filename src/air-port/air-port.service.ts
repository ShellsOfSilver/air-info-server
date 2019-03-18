import { Injectable, HttpException } from '@nestjs/common';
import { AirPort, IAirPort } from '../interfaces/airport.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";

@Injectable()
export class AirPortService {

    constructor(@InjectModel('AirPort') private readonly airPortModel: Model<AirPort>){}

    async createAirPort(airPort: IAirPort, res: any): Promise<AirPort>{
        await validate(new AirPort(airPort)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });
        const airDb = await this.airPortModel.findOne({name: airPort.name}).exec();
        if(airDb === null){
            const createdAirPort = new this.airPortModel(airPort);
            return await await createdAirPort.save();
        }else{
            throw new HttpException("Air port is already exist", 409);
        }
    }

    async updateAirPort(id: string, airPort: IAirPort): Promise<AirPort>{
        await validate(new AirPort(airPort)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });

        if(this.validId(id)){
            await this.airPortModel.updateOne({_id: id},{$set: airPort});
            return await this.airPortModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        } 
    }

    async getAllAirPorts(query: any): Promise<AirPort[]>{
        return await this.airPortModel.find().exec();
    }

    async deleteAirPort(id: string): Promise<any>{
        if(this.validId(id)){
            const status = await this.airPortModel.deleteOne({_id: id}).exec();
            if(status.n > 0){
                return Promise.resolve({message: "successful"});
            } else {
                throw new HttpException("unknown", 400);
            }
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async getAirPort(id: string): Promise<AirPort>{
        if(this.validId(id)){
            return await this.airPortModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }
}
