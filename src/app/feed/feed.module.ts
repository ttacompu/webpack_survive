import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFeedComponent } from '../feed/create-feed/create-feed.component';
import { ViewFeedComponent } from '../feed/view-feed/view-feed.component';
import { FeedService } from './services/feedService';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: ViewFeedComponent },
  { path: 'viewFeed', component: ViewFeedComponent, data: { parent: "Feeds" } },
  { path: 'createFeed', component: CreateFeedComponent, data: { parent: "Feeds" } }
];
@NgModule({
  imports: [CommonModule, GridModule, RouterModule.forChild(routes)],
  declarations: [CreateFeedComponent, ViewFeedComponent],
  exports: [CreateFeedComponent, ViewFeedComponent],
  providers: [FeedService]
})
export class FeedModule { }
