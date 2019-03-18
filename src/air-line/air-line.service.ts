import { Injectable, HttpException } from '@nestjs/common';
import { AirLine, IAirLine, IDirection } from '../interfaces/airline.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";
import { AirPlane } from 'src/interfaces/airplane.interface';
import { AirCompany } from 'src/interfaces/air-company.interface';
import { AirPort } from 'src/interfaces/airport.interface';

@Injectable()
export class AirLineService {

    constructor(
        @InjectModel('AirLine') private readonly airLineModel: Model<AirLine>,
        @InjectModel('AirPlane') private readonly airPlaneModel: Model<AirPlane>,
        @InjectModel('AirCompany') private readonly airCompanyModel: Model<AirCompany>,
        @InjectModel('AirPort') private readonly airPortModel: Model<AirPort>){}

    async createAirLine(airLine: IAirLine, res: any): Promise<AirLine>{
        await validate(new AirLine(airLine)).then(errors => {
            if (errors.length > 0) { 
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });
        const airDb = await this.airLineModel.findOne({flights: airLine.flights}).exec();
        if(airDb === null){
            const createdAirLine = new this.airLineModel(airLine);
            return await await createdAirLine.save();
        }else{
            throw new HttpException("Air line is already exist", 409);
        }
    }

    async updateAirLine(id: string, airLine: IAirLine): Promise<AirLine>{
        await validate(new AirLine(airLine)).then(errors => {
            if (errors.length > 0) {
                throw new HttpException(`validation failed. errors: ${errors}`, 400);
            } 
        });

        if(this.validId(id)){
            await this.airLineModel.updateOne({_id: id},{$set: airLine});
            return await this.airLineModel.find({_id: id}).exec();
        } else {
            throw new HttpException("unknown", 400);
        } 
    }

    async getAllAirLines(query: any): Promise<IAirLine[]>{
        return await this._getAirLines(await this.airLineModel.find().exec());
    }

    async getAirLine(id: string): Promise<IAirLine>{
        if(this.validId(id)){
            return (await this._getAirLines(await this.airLineModel.find({_id: id}).exec()) as Array<any>)[0];
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    async _getAirLines(listAirLine): Promise<IAirLine[]>{
        let netListAirLine = [];
        if(listAirLine.length){
            netListAirLine = JSON.parse(JSON.stringify(listAirLine));
            for(let i = 0; i< listAirLine.length; i++){
                const airPortFrom = await this.airPortModel.findOne({_id: netListAirLine[i].direction.fromIdAirPort}).exec();
                const airPortTo = await this.airPortModel.findOne({_id: netListAirLine[i].direction.toIdAirPort}).exec();
                const airCompany = await this.airCompanyModel.findOne({_id: netListAirLine[i].idAirCompany}).exec();
                const airPlane = await this.airPlaneModel.findOne({_id: netListAirLine[i].idPlane}).exec();
                netListAirLine[i].idPlane = airPlane ? airPlane.name ? airPlane.name : "none" : "none";
                netListAirLine[i].idAirCompany = airCompany ? airCompany.name ? airCompany.name : "none" : "none";
                (netListAirLine[i].direction as IDirection).fromIdAirPort = airPortFrom ? airPortFrom.name ? airPortFrom.name : "none" : "none";
                (netListAirLine[i].direction as IDirection).toIdAirPort = airPortTo ? airPortTo.name ? airPortTo.name : "none" : "none";    
            }
            return netListAirLine;  
        }
        return netListAirLine;  
    }

    async deleteAirLine(id: string): Promise<any>{
        if(this.validId(id)){
            const status = await this.airLineModel.deleteOne({_id: id}).exec();
            if(status.n > 0){
                return Promise.resolve({message: "successful"});
            } else {
                throw new HttpException("unknown", 400);
            }
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }
}