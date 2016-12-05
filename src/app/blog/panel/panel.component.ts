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

    /**
     * Workaround for formatted date strings on older safari versions
     */
    getFormattedDate(date: string) {
        let month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mrz";
        month[3] = "Apr";
        month[4] = "Mai";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Okt";
        month[10] = "Nov";
        month[11] = "Dez";

        let d = new Date(date);
        return `${ d.getDate() }. ${ month[d.getMonth()] } ${ d.getFullYear() }`;
    }
}
