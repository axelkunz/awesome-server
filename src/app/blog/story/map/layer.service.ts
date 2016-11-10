
import { Injectable } from '@angular/core';

@Injectable()
export class LayerService {

  KEY: string = "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ";

  basemaps: any = {

      light: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
          noWrap: true
          //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }),

      dark: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
          //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }),

      streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
          //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }),

      pencil: L.tileLayer('https://api.mapbox.com/v4/mapbox.pencil/page.html?access_token=' + this.KEY, {
          //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })
  };

  constructor() { }

}
