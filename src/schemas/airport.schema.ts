import * as mongoose from 'mongoose';

export const AirPortSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String
});