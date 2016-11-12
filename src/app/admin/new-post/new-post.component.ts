import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";
import { Story } from "../../story";
import { StoryService } from "../../story.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {

  newPost: Post;
  story: Story;
  sub: any;

  constructor(
    private storyService: StoryService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newPost = new Post();

    this.sub = this.route.params.subscribe(params => {
      this.storyService.get(params["id"]).then(story => this.story = story);
    });

  }

  create() {
    this.newPost.storyID = this.story._id;
    this.postService.create(this.newPost).then(res => {
      this.router.navigateByUrl("/admin/stories/" + this.story._id);
    });
  }

}
