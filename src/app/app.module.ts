import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./admin/dashboard.component";
import { BlogComponent } from "./blog/blog.component";
import { NewUserComponent } from "./admin/new-user/new-user.component";
import { NewPostComponent } from "./admin/new-post/new-post.component";
import { EditPostComponent } from "./admin/edit-post/edit-post.component";
import { PostComponent } from "./blog/post/post.component";
import { CommentsComponent } from "./blog/post/comments/comments.component";

import { ConfigService } from "./shared/config.service";
import { UserService } from "./user.service";
import { LayerService } from "./blog/layer.service";
import { PostService } from "./shared/post.service";
import { AuthService } from "./shared/auth.service";
import { CommentDatePipe } from "./blog/post/comments/comment-date.pipe";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogComponent,
    NewUserComponent,
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

      // admin routes
      // { path: "", redirectTo: "admin/dashboard", pathMatch: "full" },
      { path: "admin", redirectTo: "admin/dashboard", pathMatch: "full" },
      { path: "admin/dashboard", component: DashboardComponent },
      { path: "admin/new-user", component: NewUserComponent },
      { path: "admin/new-post", component: NewPostComponent },
      { path: "admin/posts/:id", component: EditPostComponent }
    ])
  ],
  providers: [AuthService, ConfigService, UserService, LayerService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
