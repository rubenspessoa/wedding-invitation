import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRsvpDto, Rsvp, RsvpDocument } from 'src/rsvp/rsvp.schema';

@Injectable()
export class RsvpService {
  constructor(@InjectModel(Rsvp.name) private rsvpModel: Model<RsvpDocument>) {}

  create(createDto: CreateRsvpDto) {
    const createdRsvp = new this.rsvpModel(createDto);
    if (!createdRsvp) {
      throw new HttpException(
        'Answer was not created.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return createdRsvp.save();
  }

  async getAll(): Promise<RsvpDocument[]> {
    const allAnswers = await this.rsvpModel.find().exec();

    if (!allAnswers) {
      throw new HttpException('No answers found.', HttpStatus.NOT_FOUND);
    }

    return allAnswers;
  }

  async get(id: string): Promise<RsvpDocument> {
    const answer = this.rsvpModel
      .findOne()
      .where('id')
      .equals(id)
      .exec();

    if (!answer) {
      throw new HttpException('Answer not found.', HttpStatus.NOT_FOUND);
    }
    return answer;
  }

  async update(id: string, updateDto: CreateRsvpDto): Promise<RsvpDocument> {
    const answer = this.rsvpModel
      .findOneAndUpdate({ id: id }, updateDto, {
        new: true,
      })
      .exec();
    if (!answer) {
      throw new HttpException('Answer not updated.', HttpStatus.BAD_REQUEST);
    }
    return answer;
  }

  async delete(id: string): Promise<RsvpDocument> {
    const answer = this.rsvpModel.findOneAndDelete({ id: id }).exec();
    if (!answer) {
      throw new HttpException(
        'Answer was not deleted.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return answer;
  }
}
