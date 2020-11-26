import { UserDocument } from './user.schema';
import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':name')
  getUser(@Param('name') name: string): Promise<UserDocument> {
    return this.usersService.findOne(name);
  }
}
