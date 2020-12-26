import { RsvpDocument } from './rsvp.schema';
import { CreateRsvpDto } from './rsvp.schema';
import { RsvpService } from './rsvp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller('rsvp')
export class RsvpController {
  constructor(private service: RsvpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    this.service.create(createRsvpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(): Promise<RsvpDocument[]> {
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string): Promise<RsvpDocument> {
    return this.service.get(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRsvpDto: CreateRsvpDto,
  ): Promise<RsvpDocument> {
    console.log('request id', id);
    return this.service.update(id, updateRsvpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<RsvpDocument> {
    return this.service.delete(id);
  }
}
