import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rsvp, RsvpSchema } from 'src/rsvp/rsvp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rsvp.name, schema: RsvpSchema }]),
  ],
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}
