import { AuthModule } from './auth/auth.module';
import { RsvpModule } from './rsvp/rsvp.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(configService.get<string>('DATABASE_URI'), {
      useNewUrlParser: true,
    }),
    RsvpModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
