import { Component, OnInit,  Input } from "@angular/core";

import { Post } from "../../shared/post";
import { Comment } from "./comments/comment";
import { PostService } from "../../shared/post.service";

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
    @Input() post: Post;

    constructor(private postService: PostService) { }

    ngOnInit() { }

    addComment(comment: Comment) {
        this.post.comments.push(comment);
        this.postService.update(this.post).then(res => {
            console.log("successfully added comment");
        });
    }

}
