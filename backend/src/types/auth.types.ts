import { Request } from 'express';
import { IUser } from './user.types.js';

export interface AuthenticatedRequest extends Request {
  user: IUser;
}