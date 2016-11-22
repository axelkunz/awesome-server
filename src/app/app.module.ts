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
import { IconService } from "./blog/icon.service";
import { PostService } from "./shared/post.service";
import { AuthService } from "./shared/auth.service";
import { FeatureService } from "./shared/feature.service";
import { GuardService } from "./shared/guard.service";
import { CommentDatePipe } from "./blog/post/comments/comment-date.pipe";
import { LoginComponent } from "./login/login.component";
import { NewFeatureComponent } from "./admin/edit-post/new-feature/new-feature.component";
import { OrderByPipe } from "./shared/order-by.pipe";
import { ReferenceComponent } from "./shared/reference/reference.component";

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
        CommentDatePipe,
        LoginComponent,
        NewFeatureComponent,
        OrderByPipe,
        ReferenceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([

            // blog routes
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "",
                component: BlogComponent,
                canActivate: [GuardService]
            },
            // { path: "**", redirectTo: "", pathMatch: "full" },

            // admin routes
            {
                path: "admin/dashboard",
                component: DashboardComponent,
                canActivate: [GuardService]
            },
            {
                path: "admin/new-user",
                component: NewUserComponent,
                canActivate: [GuardService]
            },
            {
                path: "admin/new-post",
                component: NewPostComponent,
                canActivate: [GuardService]
            },
            {
                path: "admin/posts/:id",
                component: EditPostComponent,
                canActivate: [GuardService]
            },
            {
                path: "admin/posts/:id/new-feature",
                component: NewFeatureComponent,
                canActivate: [GuardService]
            }
        ])
    ],
    providers: [
        AuthService,
        ConfigService,
        UserService,
        LayerService,
        IconService,
        PostService,
        FeatureService,
        GuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
