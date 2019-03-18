import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  comment: String,
  idPost: String,
  authorId: String,
  creationDate: Date
});