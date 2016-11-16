import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Feature } from "./feature";
import { ConfigService } from "./config.service";

@Injectable()
export class FeatureService {

    PATH: string = "/api/features/";

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    query(): Promise<Feature[]> {
        return this.http.get(this.configService.HOST + this.PATH)
                .toPromise()
                .then(function(res) {
                    return res.json().filter(o => o.properties) as Feature[];
                });
    }

    getByPostID(postID: string): Promise<Feature[]> {
        return this.http.get(this.configService.HOST + this.PATH)
                .toPromise()
                .then(function(res) {
                    return res.json().filter(o => o.properties && o.properties.postID === postID) as Feature[];
                });
    }

    create(feature: Feature): Promise<Feature> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + this.PATH, feature, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Feature;
                   });
    }
    //
    // update(post: Post): Promise<Post> {
    //     let headers = new Headers({ "Content-Type": "application/json" });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this.http.put(this.configService.HOST + this.PATH + post._id, post, options)
    //                .toPromise()
    //                .then(function(res) {
    //                    return res.json() as Post;
    //                });
    // }

    delete(id: string): Promise<any> {
        return this.http.delete(this.configService.HOST + this.PATH + id)
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }

}
