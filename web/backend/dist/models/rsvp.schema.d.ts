import { Document } from 'mongoose';
export declare type RsvpDocument = Rsvp & Document;
export declare class Rsvp {
    id: number;
    name: string;
    isGoing: boolean;
}
export declare const RsvpSchema: import("mongoose").Schema<any>;
