import * as mongoose from 'mongoose';

export const AirLineSchema = new mongoose.Schema({
  idAirCompany: String,
  idPlane: String,
  flights: String,
  direction: {
    fromIdAirPort: String,
    toIdAirPort: String  
  },
  note: String,
  flightType: String,
  status: String, 
  schedule: {
    days: [], // 0..7 
    startFly: String,
    endFly: String
  }
});