import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { ConfigService } from "../shared/config.service";
// import { IconService } from "./icon.service";
import * as L from "leaflet";

@Injectable()
export class LayerService {

    KEY: string = "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ";
    FEATURE_PATH: string = "/api/features";

    basemaps: any = {

        light: L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/" + "tiles/256/{z}/{x}/{y}?access_token=" + this.KEY, {
            noWrap: true
            // attribution: "&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors"
        }),

        dark: L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/" + "tiles/256/{z}/{x}/{y}?access_token=" + this.KEY, {
              // attribution: "&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors"
        }),

        streets: L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/" + "tiles/256/{z}/{x}/{y}?access_token=" + this.KEY, {
              // attribution: "&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors"
        }),

        pencil: L.tileLayer("https://api.mapbox.com/v4/mapbox.pencil/page.html?access_token=" + this.KEY, {
              // attribution: "&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors"
        }),

        lightOSM: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        })
    };

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    getOverview() {
        return new Promise(resolve => {
            // get geoJSON feature collection for story
            this.http.get(this.configService.HOST + this.FEATURE_PATH)
                .toPromise()
                .then(function(res) {
                    let features = res.json();
                    let layer = L.geoJSON(features, {
                        filter: function(feature) {
                            return feature.properties.category === "chapter" || feature.properties.category === "post";
                        }
                    });

                    //     onEachFeature: function (feature, layer) {
                    //         //layer.setIcon(IconService.chapterIcon);

                    //         // var popupText = $([
                    //         //     "<div>",
                    //         //       feature.properties.name,
                    //         //       "published: " + feature.properties.published,
                    //         //       "<button type="button" class="btn btn-default" ng-click="onCornfirm()">lesen</button>",
                    //         //     "</div>"
                    //         // ].join("<br>"));

                    //         // // TODO: move this out of layerService
                    //         // popupText.click(function() {
                    //         //     console.log(feature.properties);
                    //         //     $rootScope.$broadcast("postIconClick", { id: feature.properties.chapterID });
                    //         // });

                    //         // layer.bindPopup(popupText[0]);
                    //     }
                    // });

                    // L.geoJSON(data, {
                    //     style: function (feature) {
                    //         return {color: feature.properties.color};
                    //     }
                    // }).bindPopup(function (layer) {
                    //     return layer.feature.properties.description;
                    // }).addTo(map);
                    resolve(layer);
            });
        });
    }

    getPostLayer(postID: string) {
        return new Promise(resolve => {

          this.http.get(this.configService.HOST + this.FEATURE_PATH)
                  .toPromise()
                  .then(function(res) {
                      let features = res.json();
                      let layer = L.geoJSON(features, {
                          filter: function(feature) {
                              return feature.properties.category !== "chapter" && feature.properties.category !== "post" && feature.properties.postID === postID;
                          }
                      });

                      //     onEachFeature: function (feature, layer) {
                      //         //layer.setIcon(IconService.chapterIcon);

                      //         // var popupText = $([
                      //         //     "<div>",
                      //         //       feature.properties.name,
                      //         //       "published: " + feature.properties.published,
                      //         //       "<button type="button" class="btn btn-default" ng-click="onCornfirm()">lesen</button>",
                      //         //     "</div>"
                      //         // ].join("<br>"));

                      //         // // TODO: move this out of layerService
                      //         // popupText.click(function() {
                      //         //     console.log(feature.properties);
                      //         //     $rootScope.$broadcast("postIconClick", { id: feature.properties.chapterID });
                      //         // });

                      //         // layer.bindPopup(popupText[0]);
                      //     }
                      // });

                      // L.geoJSON(data, {
                      //     style: function (feature) {
                      //         return {color: feature.properties.color};
                      //     }
                      // }).bindPopup(function (layer) {
                      //     return layer.feature.properties.description;
                      // }).addTo(map);
                      resolve(layer);
                  });
        });
    }

}
