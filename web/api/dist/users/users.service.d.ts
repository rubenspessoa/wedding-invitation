import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(name: string): Promise<UserDocument>;
    publiclySafeFindOne(name: string): Promise<UserDocument>;
}
