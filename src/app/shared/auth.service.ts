import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { User } from "../user";
import { UserService } from "../user.service";
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {

    // private user: User;
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private http: Http
    ) { }

    getUser(): User {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        return currentUser;
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem("token");
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

                    if (data.success && data.token) {
                        localStorage.setItem("token", data.token);
                        resolve();
                    } else {
                        reject(data.message);
                    }
                })
                .catch(res => reject("something went wrong on the server while trying to login"));
        });
    }
}
