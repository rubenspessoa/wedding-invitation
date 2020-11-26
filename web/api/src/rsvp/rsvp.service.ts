import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRsvpDto, Rsvp, RsvpDocument } from 'src/rsvp/rsvp.schema';

@Injectable()
export class RsvpService {
  constructor(@InjectModel(Rsvp.name) private rsvpModel: Model<RsvpDocument>) {}

  create(createDto: CreateRsvpDto) {
    const createdRsvp = new this.rsvpModel(createDto);
    return createdRsvp.save();
  }

  async getAll(): Promise<RsvpDocument[]> {
    return this.rsvpModel.find().exec();
  }

  async get(id: string): Promise<RsvpDocument> {
    return this.rsvpModel
      .findOne()
      .where('id')
      .equals(id)
      .exec();
  }

  async update(id: string, updateDto: CreateRsvpDto): Promise<RsvpDocument> {
    return this.rsvpModel
      .findOneAndUpdate({ id: id }, updateDto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<RsvpDocument> {
    return this.rsvpModel.findOneAndDelete({ id: id }).exec();
  }
}
