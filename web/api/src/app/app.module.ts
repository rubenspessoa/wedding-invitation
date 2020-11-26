import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RsvpModule } from '../rsvp/rsvp.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
