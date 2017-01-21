import {
    Component,
    OnInit,
    ElementRef,
    Renderer
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as L from "leaflet";

import { Post } from "../shared/post";
import { User } from "../user";
import { PostService } from "../shared/post.service";
import { LayerService } from "./layer.service";
import { AuthService } from "../shared/auth.service";
import { UserService } from "../user.service";
declare var $: any;

@Component({
    selector: "app-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {

    posts: Post[];
    map: any;
    map2: any;
    selectedPost: Post;
    overviewLayer: any;
    postLayer: any;
    postLayer2: any;
    hoveredPostID: string;
    user: any;
    loading: boolean;
    postID: any;
    limit: number;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private layerService: LayerService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {
        this.limit = 10;
    }

    ngOnInit() {
        this.loading = true;
        this.user = this.authService.getUser();

        this.postService.query()
        .then(posts => {
            this.posts = posts.filter(o => {
                return o.published || !o.published && this.user.role === "admin";
            });
            this.loading = false;
        }).catch(() => this.loading = false);

        if (!this.map) {
            setTimeout(() => {
                this.initMap();  // init with timout to finish rendering dom
            }, 500);
        }

        // workaround for not being able to put (click) functions into innerHml
        // Listen to click events in the component
        this.renderer.listen(this.elementRef.nativeElement, "click", (event) => {
            if (event.target.attributes.class && event.target.attributes.class.value.indexOf("reference") > -1) {
                const id = event.target.attributes.class.value.split(" ")[1];
                this.onRefClick(id);
            }
        });
    }

    onRefClick(featureID: string): void {
        if (this.map2) {
            $("#myModal").modal("show");
            let marker = this.getMarkerFromLayer(this.postLayer2, featureID);
            if (marker) {
                this.map2.flyTo(marker.getLatLng());
                setTimeout(() => marker.openPopup(), 500);
            }
        } else {
            let marker = this.getMarkerFromLayer(this.postLayer, featureID);
            if (marker) {
                this.flyToMarker(marker);
                marker.openPopup();
            }
        }
    }

    showPost(post: Post) {
        this.selectedPost = post;

        // remove overview layer
        this.map.removeLayer(this.overviewLayer);

        // load post features on map
        this.addPostLayer(this.selectedPost._id);

        // update this post's view counter
        post.viewCount++;
        this.postService.update(post);

        // mark post as read
        this.markPostAsRead(this.user.username, this.selectedPost);
    }

    closeMap() {
        $("#myModal").modal("hide");
    }

    openMap(postID: string) {
        $("#myModal").modal("show");

        if (!this.map2) {
            setTimeout(() => {
                // load mobile map
                this.map2 = L.map("map2", {
                    center: [50.004716, 8.263407],
                    zoom: 3,
                    minZoom: 2
                    // zoomControl: false
                });

                // force users to stay in bounds
                // this.map2.setMaxBounds([[180, -180], [-180, 200]]);

                // add basemap
                this.layerService.basemaps.light2.addTo(this.map2);

                this.layerService.getPostLayer(postID).then(layer => {
                    this.postLayer2 = layer;
                    this.postLayer2.addTo(this.map2);

                    this.map2.flyToBounds(this.postLayer2.getBounds(), {
                        padding: [60, 60]
                    }, {
                        duration: 4
                    });
                });
            }, 500);
        } else {
            this.map2.flyToBounds(this.postLayer2.getBounds(), {
                padding: [60, 60]
            }, {
                duration: 4
            });
        }
    }

    markPostAsRead(username: string, post: Post): void {
        this.userService.query().then(users => {
            let userObj = users.find(x => x.username === username);
            if (!userObj) {
                console.log("user not found or multiple entries found!");
                return;
            }
            let finds = userObj.readPosts.find(x => x === post._id);
            if (!finds) {
                userObj.readPosts.push(post._id);
                this.userService.update(userObj);
            }
        });
    }

    showOverview() {
        this.selectedPost = null;

        // remove post features
        this.map.removeLayer(this.postLayer);

        // add overview features
        this.addOverviewLayer();
    }

    hasMore() {
        return this.posts && this.posts.length > this.limit;
    }

    raiseLimit() {
        this.limit = this.limit + 10;
    }

    initMap(): void {
        this.map = L.map("map", {
            center: [50.004716, 8.263407],
            zoom: 2,
            minZoom: 2
        });

        // force users to stay in bounds
        this.map.setMaxBounds([[180, -180], [-180, 200]]);

        // add basemap
        this.layerService.basemaps.light.addTo(this.map);

        // load overview or post layer based on requested url
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
                this.fitToLayer(this.overviewLayer);
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
            //     // land:"#FFFF00",
            //     // water:"#3333FF",
            //     // marker:"#000000"
            //     topojsonSrc: "https://github.com/johan/world.geo.json/blob/master/countries.geo.json"
            // }).addTo(this.map);
        });
        // let options = {
        //   land: '#FFFF00',
        //   water: '#3333FF',
        //   marker: '#000000',
        //   topojsonSrc: 'https://github.com/johan/world.geo.json/blob/master/countries.geo.json'
        // }
        // let miniMap = new L.Control.GlobeMiniMap(options).addTo(this.map);
    }

    getMarkerFromLayer(layer: any, featureID: string) {
        for (let marker of layer.getLayers()) {
            if (marker.feature._id === featureID) return marker;
        }
    }

    fitToLayer(layer): void {
        this.map.fitBounds(layer.getBounds(), {
            padding: [60, 60]
        });
    }

    flyToLayer(layer): void {
        this.map.flyToBounds(layer.getBounds(), {
            padding: [60, 60]
        }, {
            duration: 4
        });
    }

    flyToMarker(marker): void {
        this.map.flyTo(marker.getLatLng(), 11);
    }

    onMapResize(event): void {
        if (this.map) {
            this.map.invalidateSize();
        }
    }

}
