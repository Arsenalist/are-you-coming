export enum RsvpType {
  YES = 'yes',
  NO = 'no'
}
export interface Event {
  name: string;
  hash: string;
  permalink: string;
  rsvps?: Rsvp[]
}
export interface Rsvp {
  name: string,
  userId: string,
  eventHash: string,
  rsvp: RsvpType
}
