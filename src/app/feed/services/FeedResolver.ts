import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Feed } from '../../models/Feed';
import { FeedService } from "./feedService";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FeedResolver implements Resolve<Feed> {
  constructor(private feedService: FeedService) {
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Feed> {
    let id = +route.params['id'];
    return this.feedService.getFeed(id);
  }
}
