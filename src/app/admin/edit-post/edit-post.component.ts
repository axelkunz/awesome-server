import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";
import { Feature } from "../../shared/feature";
import { FeatureService } from "../../shared/feature.service";
import { ImageService } from "../../image.service";

@Component({
    selector: "app-edit-post",
    templateUrl: "./edit-post.component.html",
    styleUrls: ["./edit-post.component.css"]
})
export class EditPostComponent implements OnInit, OnDestroy {
    sub: any;
    post: Post;
    postID: string;
    features: Feature[];
    file: string;
    isSaved: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService,
        private featureService: FeatureService,
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.postID = params["id"];
            this.postService.get(this.postID).then(post => this.post = post);
            this.featureService.getByPostID(this.postID).then(features => this.features = features);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save(): void {
        this.postService.update(this.post).then(res => {
            this.isSaved = true;
            // this.router.navigateByUrl("/admin/dashboard");
        });
    }

    onPostChange(e): void {
        this.isSaved = false;
    }

    onBreakClick(): void {
        this.post.text += "\n<br><br>\n";
    }

    onPictureClick(): void {
        this.post.text += `\n<figure>\n  <img src="images/*/*.jpg" class="img-responsive img-rounded">\n</figure>\n`;
    }

    onLocationClick(): void {
        this.post.text += `\n<span class="reference location-id">Location</span>\n`;
    }

    deleteFeature(id: string): void {
        this.featureService.delete(id).then(res => {
            let index = this.features.findIndex(o => o._id === id);
            this.features = this.features.splice(0, index);
        });
    }
}
