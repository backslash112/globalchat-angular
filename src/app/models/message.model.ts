import { User } from "./user.model";
import { UserService } from "../services/user.service";

export class Message {
  text: string;
  from: User;

  constructor(text: string) {
    this.text = text;
  }
}