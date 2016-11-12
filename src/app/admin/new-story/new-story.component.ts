import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
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
        private location: Location,
        private router: Router
    ) { }

    ngOnInit() {
        this.story = new Story("", []);
    }

    create() {
        this.storyService.create(this.story).then(res => {
            this.router.navigateByUrl("/admin/dashboard");
        });
    }

}
