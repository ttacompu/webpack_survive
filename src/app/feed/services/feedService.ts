import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {of } from 'rxjs/observable/of'


@Injectable()
export class FeedService {

  constructor(private http_: HttpClient) {
  }

  getFeedGrids() {
    const getFeedGridUrl = "/api/feeds/1";
    return of([{name : 'Thein'}])
    //return this.http_.get(`${environment.host}${getFeedGridUrl}`);
  }
}
