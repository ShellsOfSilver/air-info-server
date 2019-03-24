import { Injectable, HttpException } from '@nestjs/common';
import { AirCompany, IAirCompany } from '../interfaces/air-company.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {validate} from "class-validator";
import { AirLine } from 'src/interfaces/airline.interface';
import { AirPort } from 'src/interfaces/airport.interface';
import { AirPlane } from 'src/interfaces/airplane.interface';

@Injectable()
export class AirCompanyService {

    constructor(@InjectModel('AirCompany') private readonly airCompanyModel: Model<AirCompany>,
                @InjectModel('AirLine') private readonly airLineModel: Model<AirLine>,
                @InjectModel('AirPlane') private readonly airPlaneModel: Model<AirPlane>,
                @InjectModel('AirPort') private readonly airPortModel: Model<AirPort>,
    ){}

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

    async getFormAirCompanys(query: any): Promise<AirCompany[]>{
        const listCompany =  JSON.parse(JSON.stringify(await this.airCompanyModel.find().exec()));
        
        for (let i = 0; i< listCompany.length; i++) {
            const newListAirPorts = [];
            for (let j = 0; j< listCompany[i].listAirPorts.length; j++) {
                const item = await this.airPortModel.findOne({_id: listCompany[i].listAirPorts[j]}).exec();
                newListAirPorts.push(item);
            }
            listCompany[i].listAirPorts = newListAirPorts;
        }

        for (let i = 0; i< listCompany.length; i++) {
            const newListAirPorts = [];
            for (let j = 0; j< listCompany[i].listPlanes.length; j++) {
                const item = await this.airPlaneModel.findOne({_id: listCompany[i].listPlanes[j]}).exec();
                newListAirPorts.push(item);
            }
            listCompany[i].listPlanes = newListAirPorts;
        }

        return listCompany;
    }

    async checkUses(id: string){
        const col = await this.airLineModel.find({idAirCompany: id}).exec();
        if(col.length > 0){
            throw new HttpException("in use", 400);
        } else {
            return true;
        }  
    }

    async deleteAirCompany(id: string): Promise<any>{
        if(this.validId(id) && await this.checkUses(id)){
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
            const listCompany =  JSON.parse(JSON.stringify(await this.airCompanyModel.find({_id: id}).exec()));
            for (let i = 0; i< listCompany.length; i++) {
                const newListAirPorts = [];
                for (let j = 0; j< listCompany[i].listAirPorts.length; j++) {
                    const item = await this.airPortModel.findOne({_id: listCompany[i].listAirPorts[j]}).exec();
                    newListAirPorts.push(item);
                }
                listCompany[i].listAirPorts = newListAirPorts;
            }
            for (let i = 0; i< listCompany.length; i++) {
                const newListAirPorts = [];
                for (let j = 0; j< listCompany[i].listPlanes.length; j++) {
                    const item = await this.airPlaneModel.findOne({_id: listCompany[i].listPlanes[j]}).exec();
                    newListAirPorts.push(item);
                }
                listCompany[i].listPlanes = newListAirPorts;
            }
            return listCompany;
        } else {
            throw new HttpException("unknown", 400);
        }
    }

    validId(id: string){
        return Types.ObjectId.isValid(id);
    }
}