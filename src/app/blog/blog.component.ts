import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Story } from "../story";
import { StoryService } from "../story.service";

@Component({
    selector: "app-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {

    stories: Story[];

    constructor(
        private storyService: StoryService,
        private router: Router//
    ) {
        // this.router = Router;
    }

    ngOnInit() {
        // this.router = Router;
        this.storyService.query().then(stories => {
            this.stories = stories;
        });
    }

    goToStory(storyID: string) {
        this.router.navigateByUrl("/" + storyID);
    }

}
