import { Injectable } from "@angular/core";
import { FeedLight } from "../../models/FeedLight";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router/src/router_state";
import { Observable } from "rxjs/Observable";
import { FeedService } from "./feedService";

@Injectable()
export class FeedListResolver implements Resolve<FeedLight[]> {
  constructor(private feedService: FeedService) {
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<FeedLight[]> {
    return this.feedService.getFeeds();
  }
}
