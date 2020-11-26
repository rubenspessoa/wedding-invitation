import { RsvpDocument } from './rsvp.schema';
import { CreateRsvpDto } from './rsvp.schema';
import { RsvpService } from './rsvp.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('rsvp')
export class RsvpController {
  constructor(private service: RsvpService) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    this.service.create(createRsvpDto);
  }

  @Get('all')
  async getAll(): Promise<RsvpDocument[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<RsvpDocument> {
    return this.service.get(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRsvpDto: CreateRsvpDto,
  ): Promise<RsvpDocument> {
    return this.service.update(id, updateRsvpDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<RsvpDocument> {
    return this.service.delete(id);
  }
}
