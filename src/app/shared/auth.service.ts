import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { User } from "../user";
import { UserService } from "../user.service";
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {

    private user: User;

    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private http: Http
    ) { }

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

            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            let postData = { username: username, password: password };

            return this.http.post(this.configService.HOST + "/auth/login", postData, options)
                .toPromise()
                .then(res => {
                    let data = res.json();
                    if (data.state === "success" && data.user) {
                        this.user = data.user;
                        resolve();
                    } else {
                        reject(data.message);
                    }
                })
                .catch(res => reject("something went wrong on the server while trying to login"));
        });
    }
}
