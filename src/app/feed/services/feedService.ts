import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { Feed } from '../../models/Feed'
import { FeedType } from '../../models/FeedType'
import { Observable } from "rxjs/Observable";
import { HttpParams } from "@angular/common/http";
import { Office } from "../../models/Office";
import { Person } from "../../models/Person";
import { Tag } from "../../models/Tag";
import { SubscriptionGroup } from "../../models/SubscriptionGroup";
import { FeedLight } from "../../models/FeedLight";
import { ContentOwner } from "../../models/ContentOwner";


@Injectable()
export class FeedService {
  private filter_ = null;

  constructor(private http_: HttpClient) {
  }

  get fileter() : any {
    return this.filter_;
  }

  set filter(val: any) {
    this.filter_ = { ...val };
  }

  getFeed(feedID: number): Observable<Feed> {
    if (feedID == 0) {
      return Observable.create((observer: any) => {
        observer.next(this.initializeFeed());
        observer.complete();
      })
    } else {
      const baseUrl = `${environment.host}` + `/api/feeds/${feedID}`
      return this.http_.get<Feed>(baseUrl);
    }
    //const url = `${this.baseUrl}/${id}`;
    //this.http_.get<Feed>(url);
  }

  getFeeds(): Observable<FeedLight[]>
  {
    const baseUrl = `${environment.host}/api/feeds`;
    return this.http_.get<FeedLight[]>(baseUrl);
    
  }

  getAllFeedType(): Observable<FeedType[]> {
    const baseUrl = `${environment.host}/api/feeds/FeedTypes`;
    return this.http_.get<FeedType[]>(baseUrl);
  }

  getAllSubscriptionGroups(): Observable<SubscriptionGroup[]> {
    const baseUrl = `${environment.host}/api/feeds/SubscritionGroups`;
    return this.http_.get<SubscriptionGroup[]>(baseUrl);
  }

  getAllOffices(): Observable<Office[]> {
    const baseUrl = `${environment.host}` + '/api/feeds/Offices'
    return this.http_.get<Office[]>(baseUrl);
  }

  getTags(): Observable<Tag[]> {
    const baseUrl = `${environment.host}/api/feeds/Tags`;
    return this.http_.get<Tag[]>(baseUrl);
  }

  getOwnerList(): Observable<ContentOwner[]> {

    const baseUrl = `${environment.host}/api/feeds/ContentOwner`;
    return this.http_.get<ContentOwner[]>(baseUrl);
    
  }

  getSubscribeUsers(): Observable<Person[]> {

    const baseUrl = `${environment.host}/api/feeds/People`;
    return this.http_.get<Person[]>(baseUrl);

  }

  isRSSValid(input: string): Observable<boolean> {
    const baseUrl = `${environment.host}/api/feeds/IsRSSValid`;
    return this.http_.get<boolean>(baseUrl, { params: new HttpParams().set("RSSinput", input) });
  }

  private initializeFeed(): Feed {
    return {
      feedID: 0,
      name: '',
      rssLink : '',
      status: '',
      lastSyncUpdatedOn: '',
      createdOn: '',
      createdBy: '',
      updatedOn: '',
      updatedBy: '',
      postCount: 0,
      isDisabled: false,
      isInternal: false,
      externalType: null,
      description: '',
      offices: [],
      subscriptions: [],
      individualSubscriptions: [],
      tags:[],
      feedContact: null
    };
  }
}
