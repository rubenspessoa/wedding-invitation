import { RsvpDocument } from './rsvp.schema';
import { CreateRsvpDto } from './rsvp.schema';
import { RsvpService } from './rsvp.service';
export declare class RsvpController {
    private service;
    constructor(service: RsvpService);
    create(createRsvpDto: CreateRsvpDto): void;
    getAll(): Promise<RsvpDocument[]>;
    get(id: string): Promise<RsvpDocument>;
    update(id: string, updateRsvpDto: CreateRsvpDto): Promise<RsvpDocument>;
    delete(id: string): Promise<RsvpDocument>;
}
