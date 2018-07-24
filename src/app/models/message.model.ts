import { User } from "./user.model";

export class Message {
  text: string;
  from: User;
  to: User;
  isRead: boolean;

  constructor(text: string, from: User, to: User = null) {
    this.text = text;
    this.from = from;
    this.to = to;
  }
}