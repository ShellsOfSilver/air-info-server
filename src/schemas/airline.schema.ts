import * as mongoose from 'mongoose';
import {Status, FlightType} from '../interfaces/airline.interface';

export const AirLineSchema = new mongoose.Schema({
  idAirCompany: String,
  idPlane: String,
  flights: String,
  direction: {
    fromIdAirPort: String,
    toIdAirPort: String  
  },
  note: String,
  status: Status,
  lightType: FlightType,
  schedule: {
    days: [], // 0..7 
    startFly: Date,
    endFly: Date
  }
});