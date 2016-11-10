import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  showPost: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onMapClick() {
    this.openPost();
  }

  openPost() {
    this.showPost = true;
  }

}
