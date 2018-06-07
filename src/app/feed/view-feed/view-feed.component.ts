import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feedService'

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {

  outResult : any[];

  constructor(private feedService_: FeedService) {

   }

  ngOnInit() {
    this.feedService_.getFeedGrids().subscribe((result) => {
       this.outResult = result as any[];
    });

  }

}
