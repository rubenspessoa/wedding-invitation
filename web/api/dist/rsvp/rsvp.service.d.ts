import { Model } from 'mongoose';
import { CreateRsvpDto, RsvpDocument } from 'src/rsvp/rsvp.schema';
export declare class RsvpService {
    private rsvpModel;
    constructor(rsvpModel: Model<RsvpDocument>);
    create(createDto: CreateRsvpDto): Promise<RsvpDocument>;
    getAll(): Promise<RsvpDocument[]>;
    get(id: string): Promise<RsvpDocument>;
    update(id: string, updateDto: CreateRsvpDto): Promise<RsvpDocument>;
    delete(id: string): Promise<RsvpDocument>;
}
