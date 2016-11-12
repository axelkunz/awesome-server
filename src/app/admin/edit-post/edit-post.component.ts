import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"]
})
export class EditPostComponent implements OnInit, OnDestroy {
  sub: any;
  post: Post;
  storyID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.storyID = params["id"];
      this.postService.get(params["pID"]).then(post => this.post = post);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.postService.update(this.post).then(res => {
      this.router.navigateByUrl("/admin/stories/" + this.storyID);
    });
  }

}
