import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of'


@Injectable()
export class NewsLetterService {

  constructor(private http_: HttpClient) {
  }

  getNewsLetters() {
    const getNewsLetterUrl = "/api/newsLetter/1";
    return of([{ name: 'Good News' }])
    //return this.http_.get(`${environment.host}${getFeedGridUrl}`);
  }
}
