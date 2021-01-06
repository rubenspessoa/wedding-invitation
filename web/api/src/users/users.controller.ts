import { UserDocument } from './user.schema';
import { UsersService } from './users.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  getUser(@Param('name') name: string): Promise<UserDocument> {
    return this.usersService.publiclySafeFindOne(name);
  }
}
