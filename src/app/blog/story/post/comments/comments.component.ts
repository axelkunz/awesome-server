import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";

import { AuthService } from "../../../../shared/auth.service";
import { Comment } from "./comment";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  @Input() comments: any[];
  @Output() onNewComment = new EventEmitter<Comment>();
  newComment: Comment;
  lock: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.newComment = new Comment();
  }

  create() {
    this.lock = true;
    this.newComment.userID = this.authService.getUser()._id;
    this.newComment.createdAt = new Date();
    this.onNewComment.emit(this.newComment);
    this.newComment = new Comment();
    this.lock = false;
  }

  // TODO: fix this
  isToday(commentDate: Date) {
    return commentDate !== new Date(); // returns true if not today
  }

}
