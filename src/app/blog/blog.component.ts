import {
    Component,
    OnInit,
    ElementRef,
    Renderer
} from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";

import { Post } from "../shared/post";
import { PostService } from "../shared/post.service";
import { LayerService } from "./layer.service";
import { AuthService } from "../shared/auth.service";

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
    user: any;
    mapHeight: string = "700px";

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private layerService: LayerService,
        private router: Router,
        private elementRef: ElementRef,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.user = this.authService.getUser();

        this.postService.query().then(posts => {
            this.posts = posts.filter(o => {
                // console.log(this.user.role === "admin");
                return o.published === true;
            });
        });

        if (!this.map) {
            this.initMap();
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
        console.log("init map");
        this.map = L.map("map", {
            center: [50.004716, 8.263407],
            zoom: 10,
            minZoom: 2
        });

        this.map.invalidateSize();

        // force users to stay in bounds
        this.map.setMaxBounds([[180, -180], [-180, 200]]);

        // add basemap
        this.layerService.basemaps.lightOSM.addTo(this.map);

        // add overview features
        this.addOverviewLayer();

        this.map.invalidateSize();
    }

    addOverviewLayer() {
        if (this.overviewLayer) {  // only load once
            this.overviewLayer.addTo(this.map);
            this.flyToLayer(this.overviewLayer);

        } else {
            this.layerService.getOverview().then(layer => {
                this.overviewLayer = layer;
                this.overviewLayer.addTo(this.map);
                this.map.invalidateSize();
                this.flyToLayer(this.overviewLayer);

                // highlight post in overview when it"s icon is hovered
                this.overviewLayer.on("mouseover", e => {
                    this.hoveredPostID = e.layer.feature.properties.postID;
                });

                this.overviewLayer.on("mouseout", e => {
                    this.hoveredPostID = null;
                });

                // show post when it"s icon is clicked
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
            //     // land:"#FFFF00",
            //     // water:"#3333FF",
            //     // marker:"#000000"
            //     topojsonSrc: "https://github.com/johan/world.geo.json/blob/master/countries.geo.json"
            // }).addTo(this.map);
        });
    }

    onRefClick(featureID: string): void {
        let marker = this.getMarkerFromLayer(this.postLayer, featureID);
        if (marker) {
            this.flyToMarker(marker);
            marker.openPopup();
        }
    }

    getMarkerFromLayer(layer: any, featureID: string) {
        for (let marker of layer.getLayers()) {
            if (marker.feature._id === featureID) return marker;
        }
    }

    fitToLayer(layer): void {
        this.map.fitBounds(layer.getBounds(), {
            // padding: [40, 40]
        });
    }

    flyToLayer(layer): void {
        this.map.flyToBounds(layer.getBounds(), {
            padding: [40, 40]
        }, {
            duration: 4
        });
    }

    flyToMarker(marker): void {
        this.map.flyTo(marker.getLatLng());
    }

    onDashboardClick(): void {
        this.router.navigateByUrl("admin/dashboard");
    }

    getImage(post): any {
        return "url('assets/" + post._id + ".jpg')";
        // return "url(http://eskipaper.com/images/pretty-landscape-sunset-1.jpg)";
    }

    onMapResize(event): void {
        this.mapHeight = `${ event.target.innerHeight }px`;
    }

}
