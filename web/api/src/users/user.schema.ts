import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  havePlusOne: boolean;

  @Prop({ required: true, default: false })
  isConfirmed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
