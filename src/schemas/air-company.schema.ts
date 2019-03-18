import * as mongoose from 'mongoose';

export const AirCompanySchema = new mongoose.Schema({
  name: String,
  address: String,
  listPlanes: [],
  listAirPorts: []
});