import { Injectable } from "@angular/core";

import { User } from "../user";
import { UserService } from "../user.service";

@Injectable()
export class AuthService {

    private user: User;

    constructor(private userService: UserService) { }

    getUser(): User {
        return this.user;
    }

    isLoggedIn(): boolean {
        if (this.user) {
            return true;
        } else {
            return false;
        };
    }

    // TODO: implement proper server auth with encrypted passwords
    login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            this.userService.getByUsername(username).then(user => {
                if (user && user.password === password) {
                    this.user = user;
                    resolve();
                } else {
                    reject("Benutzername oder Passwort falsch!");
                }
            });
        });
    }

}
