import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Post } from "../shared/post";
import { PostService } from "../shared/post.service";
import { LayerService } from "./layer.service";

@Component({
    selector: "app-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {

    posts: Post[];
    map: any;
    selectedPost: Post;

    constructor(
        private postService: PostService,
        private layerService: LayerService,
        private router: Router
    ) {
        // this.router = Router;
    }

    ngOnInit() {
        // this.router = Router;
        this.postService.query().then(posts => {
            this.posts = posts.filter(o => o.published === true);
        });
        this.initMap();
    }

    loadPost(post: Post) {
        this.selectedPost = post;
    }

    showOverview() {
        this.selectedPost = null;
    }

    initMap() {
        // L.Icon.Default.imagePath = 'path-to-your-leaflet-images-folder';
        this.map = L.map("map").setView([47.505, 13.00], 2);

        // add basemap
        this.layerService.basemaps.light.addTo(this.map);

        // ad overview layer
        this.layerService.getOverview().then(layer => {
            layer.addTo(this.map);
            this.fitToLayer(layer);
        });
    }

    fitToLayer = function(layer) {
        this.map.fitBounds(layer.getBounds(), {
            padding: [40, 40]
        });
    };

}
