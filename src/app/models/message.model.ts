import { User } from "./user.model";

export class Message {
  text: string;
  from: User;
  to: User;

  constructor(text: string, from: User, to: User) {
    this.text = text;
    this.from = from;
    this.to = to;
  }
}