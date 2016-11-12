import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { UserService } from "../user.service";
import { StoryService } from "../story.service";
import { Story } from "../story";
import { User } from "../user";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

    stories: Story[];
    users: User[];

    constructor(
        private userService: UserService,
        private storyService: StoryService,
        private location: Location
    ) {
        // console.log(this.location.path());
    }

    ngOnInit() {
        this.storyService.query().then(stories => this.stories = stories);
        this.userService.query().then(users => this.users = users);
    }

    openStoryDetails(id) {
        console.log("open story details");
        // $location.path("/dashboard/stories/" + id);
    }

    openUserDetails(id) {
        console.log("open user details");
        // $location.path("/dashboard/stories/" + id);
    }

    deleteStory(id: string) {
        this.storyService.delete(id);
    }

}
