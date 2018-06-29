import { NgModule } from '@angular/core';
import { CreateFeedComponent } from '../feed/create-feed/create-feed.component';
import { ViewFeedComponent } from '../feed/view-feed/view-feed.component';
import { FeedService } from './services/feedService';
import { FeedListResolver } from './services/FeedListResolver'
import { FeedResolver } from './services/FeedResolver'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'



const routes = [
  { path: '', component: ViewFeedComponent },
  {
    path: 'listFeed', component: ViewFeedComponent,
    data: { parent: "Feeds" },
    resolve: { feedList: FeedListResolver }
  },
  {
    path: 'editFeed/:id', component: CreateFeedComponent,
    data: { parent: "Feeds" },
    resolve: { feed: FeedResolver }
  }
];
@NgModule({
  imports: [SharedModule.forRoot(), RouterModule.forChild(routes) ],
  declarations: [CreateFeedComponent, ViewFeedComponent],
  exports: [CreateFeedComponent, ViewFeedComponent],
  providers: [FeedService, FeedListResolver, FeedResolver]
})
export class FeedModule { }
