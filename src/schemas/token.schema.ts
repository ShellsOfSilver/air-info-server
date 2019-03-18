import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  idUser: String,
  accessToken: String,
});