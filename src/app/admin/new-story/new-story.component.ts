import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { Story } from "../../story";
import { StoryService } from "../../story.service";

@Component({
    selector: "app-new-story",
    templateUrl: "./new-story.component.html",
    styleUrls: ["./new-story.component.css"]
})
export class NewStoryComponent implements OnInit {
    story: Story;

    constructor(
        private storyService: StoryService,
        private location: Location
    ) { }

    ngOnInit() {
        this.story = new Story("", []);
    }

    create() {
        this.storyService.create(this.story).then(res => {
            console.log(this.location.path());
            //this.location.path("/admin/dashboard");
            //this.router.navigateByUrl('/admin/dashboard');
        });
    }

}
