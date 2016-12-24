import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { User } from "../user";
import { UserService } from "../user.service";
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {

    allowed: Observable<boolean>;

    // private user: User;
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private http: Http
    ) { }

    getUser(): string {
        return JSON.parse(localStorage.getItem("user"));
    }

    getToken(): string {
        let user = JSON.parse(localStorage.getItem("user"));
        return user.token;
    }

    isLoggedIn() {
        return !!localStorage.getItem("user");
        // return new Promise((resolve, reject) => {
        //     // check if token exists
        //     if (!localStorage.getItem("token")) {
        //         reject(false);
        //     }
        //
        //     // check if token is valid
        //     let headers = new Headers({ "Content-Type": "application/json" });
        //     let options = new RequestOptions({ headers: headers });
        //     let authToken = localStorage.getItem("token");
        //     headers.append("Authorization", `Bearer ${ authToken }`);
        //
        //     return this.http.post(this.configService.HOST + "/auth/verify", {}, options)
        //         .toPromise()
        //         .then(res => {
        //             let data = res.json();
        //             if (data.success) {
        //                 resolve(data);
        //             } else {
        //                 reject(data);
        //             }
        //         })
        //         .catch((res: any) => resolve(res.json() || "Server error"));
        // });

    }

    verify(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.getToken()) {
                reject();
            }

            // check if token is valid
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            let authToken = this.getToken();
            headers.append("Authorization", `Bearer ${ authToken }`);

            return this.http.post(this.configService.HOST + "/auth/verify", {}, options)
                .toPromise()
                .then(res => {
                    let data = res.json();
                    if (data.success) {
                        resolve(data);
                    }
                })
                .catch((res: any) => reject(res.json() || "Server error"));
        });
    }

    login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            let postData = { username: username, password: password };

            return this.http.post(this.configService.HOST + "/auth/login", postData, options)
                .toPromise()
                .then(res => {
                    let data = res.json();
                    if (data.success && data.token) {
                        let user = {
                            username: data.user.username,
                            role: data.user.role,
                            token: data.token
                        }
                        localStorage.setItem("user", JSON.stringify(user));
                        resolve();
                    } else {
                        localStorage.removeItem("user");
                        reject(data.message);
                    }
                })
                .catch(res => {
                    localStorage.removeItem("user");
                    reject("something went wrong on the server while trying to login");
                });
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            localStorage.removeItem("user");
            resolve();
        });
    }
}
