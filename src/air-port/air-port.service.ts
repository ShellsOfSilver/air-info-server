import { Injectable, HttpException } from '@nestjs/common';
import { AirPort, IAirPort } from '../interfaces/airport.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";
import { AirCompany } from 'src/interfaces/air-company.interface';
import { AirLine } from 'src/interfaces/airline.interface';

@Injectable()
export class AirPortService {

    constructor(@InjectModel('AirPort') private readonly airPortModel: Model<AirPort>,
                @InjectModel('AirCompany') private readonly airCompanyModel: Model<AirCompany>,
                @InjectModel('AirLine') private readonly airLineModel: Model<AirLine>){}

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

    async checkUses(id: string){
        const col1 = await this.airLineModel.find({"direction.fromIdAirPort": id}).exec();
        const col2 = await this.airLineModel.find({"direction.toIdAirPort": id}).exec();
        const col3 = await this.airCompanyModel.find({listAirPorts: id}).exec();
        if(col1.length > 0 || col2.length > 0 || col3.length > 0){
            throw new HttpException("in use", 400);
        } else {
            return true;
        }   
    }


    async deleteAirPort(id: string): Promise<any>{
        if(this.validId(id) && await this.checkUses(id)){
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
