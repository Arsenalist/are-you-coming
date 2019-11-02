export enum RsvpType {
  YES = 'yes',
  NO = 'no'
}
export interface Event {
  id: number;
  name: string;
  hash: string;
  permalink: string;
  rsvps?: Rsvp[]
}
export interface Rsvp {
  name: string,
  rsvp: RsvpType
}
