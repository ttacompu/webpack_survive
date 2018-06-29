import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feedService'
import { FeedLight } from '../../models/FeedLight'
import { process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor } from '@progress/kendo-data-query/dist/npm/grouping/group-descriptor.interface';
import * as R from 'ramda';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {
  today = Date.now();
  gridData: GridDataResult;
  feedData: FeedLight[];

  public state: State = {
    skip: 0,
    take: 3,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    },
    group : []
  };
  

  constructor(private route: ActivatedRoute, private feedService_: FeedService) {

   }

  ngOnInit() {
    this.feedData = this.route.snapshot.data["feedList"];
    this.gridData = process(this.feedData, this.state);

    if (!R.isEmpty(this.feedService_.fileter) ) {
      this.state.filter = this.feedService_.fileter;
      this.gridData = process(this.feedData, this.state);
    }
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.feedData, this.state);
  }

 
  saveFilters() {
    if (this.state.filter) {
      this.feedService_.filter = this.state.filter;
    }
  }

  clearFilters() {
    if (this.state.filter) {
      this.feedService_.filter = null;
      this.state.filter = null;
      this.gridData = process(this.feedData, this.state);
    }
  }
   
}
