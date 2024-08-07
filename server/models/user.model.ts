import { Schema, model } from 'mongoose';
import { UserDocument } from '~/server/types/user';

const UserSchema = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  targetBalance: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  autoreload: {
    type: Boolean,
    required: true,
  }
})

export const UserModel = model<UserDocument>('User', UserSchema)