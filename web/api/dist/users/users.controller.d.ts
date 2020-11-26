import { UserDocument } from './user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(name: string): Promise<UserDocument>;
}
