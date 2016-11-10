import { Component, OnInit } from "@angular/core";
import { LayerService } from "./layer.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {

  map: any;

  constructor(private layerService: LayerService) { }

  ngOnInit() {
    this.map = L.map("map").setView([47.505, 13.00], 2);

    // add basemap
    this.layerService.basemaps.light.addTo(this.map);

    // add globe button
    // L.easyButton('fa-globe', function(btn, map) {
    //     //$rootScope.$broadcast("showOverview");
    //     console.log("go back");
    // }).addTo(this.map);

  }

}
