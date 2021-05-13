import { IUser } from './IUser';
import { Request } from 'express';

export interface TRequest extends Request {
    user?: {
        _id?: String,
        email?: String
    }
}