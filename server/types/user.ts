import { Document } from 'mongoose'

export interface IUser {
  wallet: string,
  balance: string,
  targetBalance: string,
  target: string,
  autoreload: boolean
}

export interface UserDocument extends IUser, Document { 
  _id: string
}