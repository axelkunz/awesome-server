export class Feature {
    _id: string;
    type: string;
    properties: {};
    geometry: {};

    constructor() {
        this.type = "Feature";
        this.geometry = {};
        this.properties = {};
    }
}
