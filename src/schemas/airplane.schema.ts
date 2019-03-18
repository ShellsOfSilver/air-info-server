import * as mongoose from 'mongoose';

export const AirPlaneSchema = new mongoose.Schema({
  name: String,
  maxSpeed: Number,
  maxDistance: Number,
  description: String,
  capacity: {
    economy: Number,
    premiumEconomy: Number,
    business: Number,
    first: Number
  }
});