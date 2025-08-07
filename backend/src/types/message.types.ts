import { Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageRequest {
  text?: string;
  image?: string;
}