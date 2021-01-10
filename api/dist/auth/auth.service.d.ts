import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(name: string, pass: string): Promise<any>;
    signJwt(username: string): Promise<{
        jwt: string;
    }>;
}
