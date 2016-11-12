import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  HOST: string = "http://localhost:3000";

  ROLES: string[] = [
    "admin",
    "family",
    "friend"
  ];

  constructor() { }

}
