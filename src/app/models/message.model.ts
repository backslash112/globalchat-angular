import { User } from "./user.model";
import { AuthService } from "../services/auth.service";

export class Message {
  text: string;
  from: User;

  constructor(text: string) {
    this.text = text;
  }
}