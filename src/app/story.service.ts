import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Story } from "./story";
import { ConfigService } from "./shared/config.service";

@Injectable()
export class StoryService {

    constructor(private http: Http, private configService: ConfigService) { }

    query(): Promise<Story[]> {
        return this.http.get(this.configService.HOST + "/api/stories")
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Story[];
                   });
    }

    create(story: Story): Promise<Story> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + "/api/stories", story, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Story;
                   });
    }

    delete(id: string): Promise<any> {
        return this.http.delete(this.configService.HOST + "/api/stories/" + id)
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }

}
