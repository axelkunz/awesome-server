import { Injectable } from "@angular/core";

import { User } from "../user";

@Injectable()
export class AuthService {

  private user: any;

  constructor() {
    this.user = {
      _id: "user123",
      username: "axel",
      role: "admin"
    };
  }

  getUser(): User {
    return this.user;
  }

}
