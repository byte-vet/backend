import mongoose, { Schema } from 'mongoose';
import USER_TYPE from '../enums/userType';

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
  userType: {
    type: String,
    enum: [USER_TYPE.VETERINARIO, USER_TYPE.CLIENTE],
    required: true
  }
});

const Token = mongoose.model('token', tokenSchema);
export { Token };