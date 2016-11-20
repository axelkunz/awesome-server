export class Feature {
    _id: string;
    type: string = "Feature";
    properties: {
        postID: string,
        category: string,
        name: string
    };
    geometry: {
        type: string,
        coordinates: any[]
    };

    constructor() { }
}
