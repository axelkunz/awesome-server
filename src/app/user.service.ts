import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { User } from "./user";
import { ConfigService } from "./shared/config.service";

@Injectable()
export class UserService {

    PATH: string = "/api/users";

    constructor(private http: Http, private configService: ConfigService) { }

    query(): Promise<User[]> {
        return this.http.get(this.configService.HOST + this.PATH)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as User[];
                   });
    }

    create(user: User): Promise<User> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + this.PATH, user, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as User;
                   });
    }

}
