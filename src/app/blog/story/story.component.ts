import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Story } from "../../story";
import { StoryService } from "../../story.service";
import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent implements OnInit, OnDestroy {

  showPost: boolean = false;
  post: Post;
  sub: any;
  story: Story;

  constructor(
    private storyService: StoryService,
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.storyService.get(params["id"]).then(story => {
        this.story = story;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onMapClick() {
    this.openPost();
  }

  openPost() {
    this.showPost = true;
    this.postService.query().then(posts => {
      this.post = posts.filter(o => o.storyID === this.story._id)[0];
    });
  }

}
