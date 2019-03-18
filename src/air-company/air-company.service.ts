import { Injectable, HttpException } from '@nestjs/common';
import { AirCompany, IAirCompany } from '../interfaces/air-company.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";

@Injectable()
export class AirCompanyService {

    constructor(@InjectModel('AirCompany') private readonly airCompanyModel: Model<AirCompany>){}

    async createAirCompany(airCompany: IAirCompany, res: any): Promise<AirCompany>{
        await validate(new AirCompany(airCompany)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });
        const airDb = await this.airCompanyModel.findOne({name: airCompany.name}).exec();
        if(airDb === null){
            const createdAirCompany = new this.airCompanyModel(airCompany);
            return await await createdAirCompany.save();
        }else{
            throw new HttpException("Air company is already exist", 409);
        }
    }

    async updateAirCompany(id: string, airCompany: IAirCompany): Promise<AirCompany>{
        await validate(new AirCompany(airCompany)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });

        if(this.validId(id)){
            await this.airCompanyModel.updateOne({_id: id},{$set: airCompany});
            return await this.airCompanyModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        } 
    }

    async getAllAirCompanys(query: any): Promise<AirCompany[]>{
        return await this.airCompanyModel.find().exec();
    }

    async deleteAirCompany(id: string): Promise<any>{
        if(this.validId(id)){
            const status = await this.airCompanyModel.deleteOne({_id: id}).exec();
            if(status.n > 0){
                return Promise.resolve({message: "successful"});
            } else {
                throw new HttpException("unknown", 400);
            }
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async getAirCompany(id: string): Promise<AirCompany>{
        if(this.validId(id)){
            return await this.airCompanyModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }
}