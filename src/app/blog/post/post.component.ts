import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { Post } from "../../shared/post";
import { Comment } from "./comments/comment";
import { PostService } from "../../shared/post.service";
import { AuthService } from "../../shared/auth.service";

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    unsafeHtml: any;
    hasLiked: boolean;

    constructor(
        private postService: PostService,
        protected domSanitizer: DomSanitizer,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.unsafeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.post.text);
        let user = this.authService.getUser();

        let finds = this.post.likes.find((x) => x === user.username);
        this.hasLiked = finds ? true : false;
    }

    addComment(comment: Comment) {
        this.post.comments.push(comment);
        this.postService.update(this.post).then(res => {
            console.log("successfully added comment");
        });
    }

    /**
     * Workaround for formatted date strings on older safari versions
     */
    getFormattedDate(date: string) {
        let month = new Array();
        month[0] = "Januar";
        month[1] = "Februar";
        month[2] = "März";
        month[3] = "April";
        month[4] = "Mai";
        month[5] = "Juni";
        month[6] = "Juli";
        month[7] = "August";
        month[8] = "September";
        month[9] = "Oktober";
        month[10] = "November";
        month[11] = "Dezember";

        let d = new Date(date);
        return `${ d.getDate() }. ${ month[d.getMonth()] } ${ d.getFullYear() }`;
    }

    like() {
        if (!this.hasLiked) {
            let user = this.authService.getUser();
            this.post.likes.push(user.username);
            this.hasLiked = true;
            this.postService.update(this.post).then(res => {
                console.log("success");
            }).catch(() => this.hasLiked = false);
        }
    }

    getColor() {
        return this.hasLiked ? "IndianRed" : "";
    }

    getSeparator(index: number) {
        if (this.post.likes.length > 2 && index < this.post.likes.length - 2) {
            return ", ";
        } else if (index === this.post.likes.length - 2) {
            return " und ";
        } else {
            return "";
        }
    }
}
