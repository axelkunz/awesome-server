import {
    Component,
    OnInit,
    ElementRef,
    Renderer
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    postID: any;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private layerService: LayerService,
        private route: ActivatedRoute,
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
