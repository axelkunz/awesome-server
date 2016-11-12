import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Post } from "./post";
import { ConfigService } from "./config.service";

@Injectable()
export class PostService {

  PATH: string = "/api/posts/";

  constructor(
    private http: Http,
    private configService: ConfigService
  ) { }

  query(): Promise<Post[]> {
    return this.http.get(this.configService.HOST + this.PATH)
                .toPromise()
                .then(function(res) {
                    return res.json() as Post[];
                });
  }

    get(id): Promise<Post> {
        return this.http.get(this.configService.HOST + this.PATH + id)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    create(post: Post): Promise<Post> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + this.PATH, post, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    update(post: Post): Promise<Post> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.configService.HOST + this.PATH + post._id, post, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    // delete(id: string): Promise<any> {
    //     return this.http.delete(this.configService.HOST + "/api/stories/" + id)
    //                .toPromise()
    //                .then(function(res) {
    //                    return res.json();
    //                });
    // }

}
