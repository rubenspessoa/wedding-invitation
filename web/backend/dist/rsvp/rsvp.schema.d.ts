import { Document } from 'mongoose';
export declare type RsvpDocument = Rsvp & Document;
export declare class Rsvp {
    frontendId: number;
    name: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel: boolean;
    foodAllergies: string;
}
export declare const RsvpSchema: import("mongoose").Schema<any>;
export declare class CreateRsvpDto {
    frontendId: number;
    name: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel?: boolean;
    foodAllergies: string;
}
