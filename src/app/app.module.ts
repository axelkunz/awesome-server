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

import { UserService } from "./user.service";
import { StoryService } from "./story.service";
import { LayerService } from "./blog/story/map/layer.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogComponent,
    NewStoryComponent,
    NewUserComponent,
    StoryDetailComponent,
    StoryComponent,
    MapComponent
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
      { path: "admin/stories/:id", component: StoryDetailComponent }
    ])
  ],
  providers: [UserService, StoryService, LayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
