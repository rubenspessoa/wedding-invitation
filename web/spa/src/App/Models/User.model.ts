export interface User {
  _id: string;
  name: string;
  havePlusOne: boolean;
}

export type NullableUser = User | undefined;
