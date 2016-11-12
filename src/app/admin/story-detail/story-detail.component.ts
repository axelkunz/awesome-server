import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Story } from "../../story";
import { StoryService } from "../../story.service";
import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";

@Component({
  selector: "app-story-detail",
  templateUrl: "./story-detail.component.html",
  styleUrls: ["./story-detail.component.css"]
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  story: Story;
  storyID: string;
  posts: Post[];
  private sub: any;

  constructor(
    private storyService: StoryService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.storyID = params["id"];
      this.storyService.get(this.storyID).then(story => {
        this.story = story;

        // get posts
        this.postService.query().then(posts => {
          this.posts = posts.filter(o => o.storyID === this.story._id);
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openNewPost() {
    this.router.navigateByUrl("/admin/stories/" + this.storyID + "/new-post");
  }

  editPost(id) {
    this.router.navigateByUrl("/admin/stories/" + this.storyID + "/posts/" + id);
  }

}
