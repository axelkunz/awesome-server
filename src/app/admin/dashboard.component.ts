import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { StoryService } from "../story.service";
import { Story } from "../story";
import { User } from "../user";
import { PostService } from "../shared/post.service";

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
        private postService: PostService,
        private router: Router
    ) { }

    ngOnInit() {
        this.storyService.query().then(stories => this.stories = stories);
        this.userService.query().then(users => this.users = users);
    }

    getPosts(storyID) {
        return new Promise(function(resolve) {
            // get posts
            this.postService.query().then(posts => {
                console.log(posts.filter(o => o._id === storyID).length)
                resolve(posts.filter(o => o._id === storyID));
            });
        });
    }

    openStoryDetails(storyID) {
        console.log("open story details");
        this.router.navigateByUrl("/admin/stories/" + storyID);
    }

    openUserDetails(id) {
        console.log("open user details");
        // $location.path("/dashboard/stories/" + id);
    }

    deleteStory(id: string) {
        this.storyService.delete(id);
    }

}
