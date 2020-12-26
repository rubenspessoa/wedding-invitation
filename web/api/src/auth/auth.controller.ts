import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return this.authService.signJwt(body.username);
  }
}
