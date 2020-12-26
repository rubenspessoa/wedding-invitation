import { Document } from 'mongoose';
export declare type RsvpDocument = Rsvp & Document;
export declare class Rsvp {
    name: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel: boolean;
    foodAllergies: string;
}
export declare const RsvpSchema: import("mongoose").Schema<any>;
export declare class CreateRsvpDto {
    name: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel?: boolean;
    foodAllergies: string;
}
