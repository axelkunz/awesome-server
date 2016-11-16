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
    overviewLayer: any;
    postLayer: any;
    hoveredPostID: string;

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

    showPost(post: Post) {
        this.selectedPost = post;

        // remove overview layer
        this.map.removeLayer(this.overviewLayer);

        // load post features on map
        this.addPostLayer(this.selectedPost._id);
    }

    showOverview() {
        this.selectedPost = null;

        // remove post features
        this.map.removeLayer(this.postLayer);

        // add overview features
        this.addOverviewLayer();
    }

    initMap() {
        this.map = L.map("map").setView([0, 0], 5);

        // add basemap
        this.layerService.basemaps.lightOSM.addTo(this.map);

        // add overview features
        this.addOverviewLayer();
    }

    addOverviewLayer() {
        if (this.overviewLayer) {  // only load once
            this.overviewLayer.addTo(this.map);
            this.flyToLayer(this.overviewLayer);

        } else {
            this.layerService.getOverview().then(layer => {
                this.overviewLayer = layer;
                this.overviewLayer.addTo(this.map);
                // this.fitToLayer(this.overviewLayer);

                // highlight post in overview when it's icon is hovered
                this.overviewLayer.on("mouseover", e => {
                    this.hoveredPostID = e.layer.feature.properties.postID;
                });

                this.overviewLayer.on("mouseout", e => {
                    this.hoveredPostID = null;
                });

                // show post when it's icon is clicked
                this.overviewLayer.on("click", e => {
                    let clickedPost = this.posts.find(o => {
                        return o._id === e.layer.feature.properties.postID;
                    });
                    this.showPost(clickedPost);
                });
            });
        }
    }

    addPostLayer(postID: string) {
        this.layerService.getPostLayer(postID).then(layer => {
            this.postLayer = layer;
            this.postLayer.addTo(this.map);
            this.flyToLayer(this.postLayer);


            // add globe
            // let miniMap = new L.Control.GlobeMiniMap({
            //     // land:'#FFFF00',
            //     // water:'#3333FF',
            //     // marker:'#000000'
            //     topojsonSrc: "https://github.com/johan/world.geo.json/blob/master/countries.geo.json"
            // }).addTo(this.map);
        });
    }

    fitToLayer(layer) {
        this.map.fitBounds(layer.getBounds(), {
            // padding: [40, 40]
        });
    }

    flyToLayer(layer) {
        this.map.flyToBounds(layer.getBounds(), {
            // padding: [40, 40]
        }, {
            duration: 4
        });
    }

}
