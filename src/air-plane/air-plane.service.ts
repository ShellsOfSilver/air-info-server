import { Injectable, HttpException } from '@nestjs/common';
import { AirPlane, IAirPlane } from '../interfaces/airplane.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";
import { AirCompany } from 'src/interfaces/air-company.interface';
import { AirLine } from 'src/interfaces/airline.interface';

@Injectable()
export class AirPlaneService {

    constructor(@InjectModel('AirPlane') private readonly airPlaneModel: Model<AirPlane>,
                @InjectModel('AirCompany') private readonly airCompanyModel: Model<AirCompany>,
                @InjectModel('AirLine') private readonly airLineModel: Model<AirLine>){}

    async createAirPlane(airPlane: IAirPlane, res: any): Promise<AirPlane>{
        await validate(new AirPlane(airPlane)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });
        const airDb = await this.airPlaneModel.findOne({name: airPlane.name}).exec();
        if(airDb === null){
            const createdAirPlane = new this.airPlaneModel(airPlane);
            return await await createdAirPlane.save();
        }else{
            throw new HttpException("Air plane is already exist", 409);
        }
    }

    async updateAirPlane(id: string, airPlane: IAirPlane): Promise<AirPlane>{
        await validate(new AirPlane(airPlane)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });

        if(this.validId(id)){
            await this.airPlaneModel.updateOne({_id: id},{$set: airPlane});
            return await this.airPlaneModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        } 
    }

    async getAllAirPlanes(query: any): Promise<AirPlane[]>{

        const list = await this.airPlaneModel.find().exec();
        const newList = [];
        let col = 0;
        const filterString = query.filter.toLowerCase();
        for (let i = 0; i< list.length; i++) {
            if(JSON.stringify(list[i].name).toLowerCase().indexOf(filterString)>=0){
                newList.push(list[i]);
                col++;
            }
        }
        return col > 0?newList: list;
    }

    async checkUses(id: string){
        const col1 = await this.airLineModel.find({idPlane: id}).exec();
        const col2 = await this.airCompanyModel.find({listPlanes: id}).exec();
        if(col1.length > 0 || col2.length > 0){
            throw new HttpException("in use", 400);
        } else {
            return true;
        }  
    }

    async deleteAirPlane(id: string): Promise<any>{
        if(this.validId(id) && await this.checkUses(id)){
            const status = await this.airPlaneModel.deleteOne({_id: id}).exec();
            if(status.n > 0){
                return Promise.resolve({message: "successful"});
            } else {
                throw new HttpException("unknown", 400);
            }
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async getAirPlane(id: string): Promise<AirPlane>{
        if(this.validId(id)){
            return await this.airPlaneModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }
}
