import { Component, OnInit,  Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

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
    unsafeHtml: any;

    constructor(
        private postService: PostService,
        protected domSanitizer: DomSanitizer
    ) {
        console.log("init constructior!");
    }

    ngOnInit() {
        console.log("init!");
        this.unsafeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.post.text);
        console.log(this.post);
    }

    addComment(comment: Comment) {
        this.post.comments.push(comment);
        this.postService.update(this.post).then(res => {
            console.log("successfully added comment");
        });
    }
}
