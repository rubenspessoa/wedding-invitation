export interface Rsvp {
  _id?: string;
  foodAllergies: string;
  havePlusOne: boolean;
  isGoing: boolean;
  isStayingAtHotel: boolean;
  name: string;
  plusOneIsStayingAtHotel: boolean;
}

export type NullableRsvp = Rsvp | undefined;
