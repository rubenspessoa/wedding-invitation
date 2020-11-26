import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RsvpDocument = Rsvp & Document;

@Schema()
export class Rsvp {
  @Prop({ required: true })
  frontendId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isGoing: boolean;

  @Prop({ required: true })
  isStayingAtHotel: boolean;

  @Prop({ required: true })
  havePlusOne: boolean;

  @Prop()
  plusOneIsStayingAtHotel: boolean;

  @Prop()
  foodAllergies: string;
}

export const RsvpSchema = SchemaFactory.createForClass(Rsvp);

export class CreateRsvpDto {
  frontendId: number;
  name: string;
  isGoing: boolean;
  isStayingAtHotel: boolean;
  havePlusOne: boolean;
  plusOneIsStayingAtHotel?: boolean;
  foodAllergies: string;
}
