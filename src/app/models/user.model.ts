export class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(email: string, password: string = null) {
    this.email = email;
    this.password = password;

  }
}