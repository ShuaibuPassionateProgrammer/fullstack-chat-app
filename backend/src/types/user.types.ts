import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
}