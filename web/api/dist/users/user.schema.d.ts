import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    password: string;
    havePlusOne: boolean;
    isConfirmed: boolean;
}
export declare const UserSchema: import("mongoose").Schema<any>;
