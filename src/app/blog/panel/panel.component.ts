import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Post } from "../../shared/post";

@Component({
    selector: "app-panel",
    templateUrl: "./panel.component.html",
    styleUrls: ["./panel.component.css"]
})
export class PanelComponent implements OnInit {
    @Input() post: Post;
    @Output() panelClick = new EventEmitter<Post>();

    constructor() { }

    ngOnInit() { }

    getImage(post): any {
        // return "url('assets/" + post._id + ".jpg')";
        // return "url(http://eskipaper.com/images/pretty-landscape-sunset-1.jpg)";
    }

    onClick() {
        this.panelClick.emit(this.post);
    }
}
