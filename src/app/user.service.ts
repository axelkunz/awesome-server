import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { User } from "./user";

@Injectable()
export class UserService {
    HOST = "http://localhost:3000";

    constructor(private http: Http) { }

    query(): Promise<User[]> {
        return this.http.get(this.HOST + "/api/users")
                   .toPromise()
                   .then(function(res) {
                       return res.json() as User[];
                   });
    }

}
