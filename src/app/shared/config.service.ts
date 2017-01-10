import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {

  HOST: string = "http://localhost:3000";  // http://localhost:3000
  PICTURE_PATH: string = this.HOST + "/images";

  ROLES: string[] = [
    "admin",
    "family",
    "friend"
  ];

  constructor() { }

}
