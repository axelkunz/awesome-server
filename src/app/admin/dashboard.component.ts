import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { User } from "../user";
import { Post } from "../shared/post";
import { PostService } from "../shared/post.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

    posts: Post[];
    users: User[];

    constructor(
        private userService: UserService,
        private postService: PostService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.postService.query().then(posts => this.posts = posts);
        this.userService.query().then(users => this.users = users);
    }

    openNewPost(): void {
      this.router.navigateByUrl("/admin/new-post");
    }

    editPost(id: string) {
        this.router.navigateByUrl(`/admin/posts/${id}`);
    }

    openUserDetails(id): void {
        console.log("open user details");
        // $location.path("/dashboard/stories/" + id);
    }

}
