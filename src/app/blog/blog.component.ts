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
    mapHeight: string = "768px";
    loading: boolean;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private layerService: LayerService,
        private router: Router,
        private elementRef: ElementRef,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.loading = true;
        this.user = this.authService.getUser();

        this.postService.query()
        .then(posts => {
            this.posts = posts.filter(o => {
                return o.published || !o.published && this.user.role === "admin";
            });
            this.loading = false;
        });

        this.authService.verify().catch(() => this.router.navigateByUrl("/login"));

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

    onRefClick(featureID: string): void {
        let marker = this.getMarkerFromLayer(this.postLayer, featureID);
        if (marker) {
            this.flyToMarker(marker);
            marker.openPopup();
        }
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
        this.map = L.map("map", {
            center: [50.004716, 8.263407],
            zoom: 2,
            minZoom: 2
        });

        this.map.invalidateSize();

        // force users to stay in bounds
        this.map.setMaxBounds([[180, -180], [-180, 200]]);

        // add basemap
        this.layerService.basemaps.light.addTo(this.map);

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
                // this.flyToLayer(this.overviewLayer);
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

    onMapResize(event): void {
        if (this.selectedPost) {
            this.flyToLayer(this.postLayer);
        } else {
            this.flyToLayer(this.overviewLayer);
        }
    }

}
