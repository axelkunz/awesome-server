import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";

import { AuthService } from "../../../shared/auth.service";
import { Comment } from "./comment";

@Component({
    selector: "app-comments",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
    @Input() comments: any[];
    @Output() onNewComment = new EventEmitter<Comment>();
    @Output() onCommentDelete = new EventEmitter<Comment>();
    newComment: Comment;
    lock: boolean;
    user: any;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.newComment = new Comment();
    }

    create() {
        this.lock = true;
        this.newComment.username = this.user;
        this.newComment.createdAt = new Date();
        this.onNewComment.emit(this.newComment);

        // reset
        this.newComment = new Comment();
        this.lock = false;
    }

    onDelete(comment: Comment) {
        this.onCommentDelete.emit(comment);
    }

    // TODO: fix this
    isToday(commentDate: Date) {
        return commentDate !== new Date(); // returns true if not today
    }

}
