import { User } from "./user.model";
import { Message } from "./message.model";

export class Conversation {
  private _history: Array<Message> = new Array();
  user: User;
  draft: string;
  activeTime: Date;

  public get history(): Array<Message> {
    return this._history;
  }

  constructor(user: User) {
    this.user = user;
    this.updateActiveTime();
  }

  private updateActiveTime() {
    this.activeTime = new Date();
  }
  public pushHistory(message: Message) {
    this._history.push(message);
    this.updateActiveTime();
  }
}