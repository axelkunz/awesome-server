import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./admin/dashboard.component";
import { BlogComponent } from "./blog/blog.component";
import { NewStoryComponent } from "./admin/new-story/new-story.component";
import { NewUserComponent } from "./admin/new-user/new-user.component";
import { StoryDetailComponent } from "./admin/story-detail/story-detail.component";
import { StoryComponent } from "./blog/story/story.component";
import { MapComponent } from "./blog/story/map/map.component";
import { NewPostComponent } from './admin/new-post/new-post.component';
import { EditPostComponent } from './admin/edit-post/edit-post.component';
import { PostComponent } from './blog/story/post/post.component';
import { CommentsComponent } from './blog/story/post/comments/comments.component';

import { ConfigService } from "./shared/config.service";
import { UserService } from "./user.service";
import { StoryService } from "./story.service";
import { LayerService } from "./blog/story/map/layer.service";
import { PostService } from "./shared/post.service";
import { AuthService } from "./shared/auth.service";
import { CommentDatePipe } from './blog/story/post/comments/comment-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogComponent,
    NewStoryComponent,
    NewUserComponent,
    StoryDetailComponent,
    StoryComponent,
    MapComponent,
    NewPostComponent,
    EditPostComponent,
    PostComponent,
    CommentsComponent,
    CommentDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      // blog routes
      { path: "", component: BlogComponent },
      { path: ":id", component: StoryComponent },

      // admin routes
      // { path: "", redirectTo: "admin/dashboard", pathMatch: "full" },
      { path: "admin", redirectTo: "admin/dashboard", pathMatch: "full" },
      { path: "admin/dashboard", component: DashboardComponent },
      { path: "admin/new-story", component: NewStoryComponent },
      { path: "admin/new-user", component: NewUserComponent },
      { path: "admin/stories/:id", component: StoryDetailComponent },
      { path: "admin/stories/:id/new-post", component: NewPostComponent },
      { path: "admin/stories/:id/posts/:pID", component: EditPostComponent }
    ])
  ],
  providers: [AuthService, ConfigService, UserService, StoryService, LayerService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
