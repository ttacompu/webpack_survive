import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { InternalOrExternalValidator } from '../services/CustomValidators';
import { AbstractControl } from '@angular/forms/src/model';
import { FeedService } from '../services/feedService';
import { Feed } from '../../models/Feed';
import { FeedType } from '../../models/FeedType';
import { Office } from '../../models/Office';
import { ValidationRuleService } from '../../shared/validationRuleService';
import { Person } from '../../models/Person';
import { from } from 'rxjs/observable/from';
import { Tag } from '../../models/Tag';
import { SubscriptionGroup } from '../../models/SubscriptionGroup';
import { ContentOwner } from '../../models/ContentOwner';
import * as R from 'ramda';



@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.css']
})
export class CreateFeedComponent implements OnInit {

  isRssValid: boolean;
  IsNew: boolean;
  feed: Feed;
  FeedForm: FormGroup;
  Subscriptions: Subscription = new Subscription();

  @ViewChild('Tag') Tag;
  @ViewChild('ContentOwner') ContentOwner;
  @ViewChild('SubscriptionUser') SubscriptionUser;
  @ViewChild('SubscriptionGroup') SubscriptionGroup;


  pageKey = "createPage";

  errorMessages = {
    Name: "",
    RSSLink: "",
    OfficeList: "",
    ContentOwner: "",
    Tags: ""
  };

  ExternalTypeList: FeedType[] = [];
  OfficeListItems: Office[] = [];

  ContentOwnerList: ContentOwner[] = [];
  ContentOwnerListResult: ContentOwner[] = [];

  TagListItems: Tag[] = [];
  TagListResult: Tag[] = [];
  SubscriptionUserListItems: Person[] = [];
  SubscriptionUserListResult: Person[] = [];
  SubscriptionGroupListItems: SubscriptionGroup[] = [];
  SubscriptionGroupListResult: SubscriptionGroup[] = [];

  private RSSLinkValid(control: AbstractControl) {
    return timer(2000).pipe(switchMap(() => {
      return this.feedService.isRSSValid(control.value).map(res => {
        if (res) {
          return null;
        } else {
          this.isRssValid = false;
          return { rssLinkInvalid: true }
        }
      })
    }));
  }

  private mapFactory = (dataSource, fieldName='name') => (input: any) => {
    if (!input.length || (input.length < 2)) {
      return []
    } else {
      return this[dataSource].filter((x) => x[fieldName].toLocaleLowerCase().indexOf(input.toLowerCase()) !== -1)
    }
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private feedService: FeedService, private validationRuleService: ValidationRuleService) { }

  ngAfterViewInit() {

    this.addBusineeRuleToObservable(this.Tag.filterChange.asObservable(), this.mapFactory("TagListItems"),
      (result => { this.TagListResult = result }).bind(this));

    this.addBusineeRuleToObservable(this.ContentOwner.filterChange.asObservable(), this.mapFactory("ContentOwnerList", "fullName"),
      (result => { this.ContentOwnerListResult = result }).bind(this));

    this.addBusineeRuleToObservable(this.SubscriptionUser.filterChange.asObservable(), this.mapFactory("SubscriptionUserListItems", "fullName"),
      (result => { this.SubscriptionUserListResult = result }).bind(this));

    this.addBusineeRuleToObservable(this.SubscriptionGroup.filterChange.asObservable(), this.mapFactory("SubscriptionGroupListItems", "groupName"),
      (result => { this.SubscriptionGroupListResult = result }).bind(this));
  }

  addBusineeRuleToObservable(obs, mapFn, subscriptionFn) {
    const resultObs = obs
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .pipe(map(mapFn));
    this.Subscriptions.add(resultObs.subscribe(
      subscriptionFn
    ));

  }

  ngOnInit() {
    this.validationRuleService.SetValidationRules({
      [this.pageKey]: {
        Name: ['', Validators.required],
        RSSLink: ['', [Validators.required], [this.RSSLinkValid.bind(this)]],
        InternalOrExternal: this.fb.group({
          IsInternal: [''],
          ExternalTypeItem: ['']
        }, { validator: InternalOrExternalValidator }),
        OfficeList: [[], Validators.required],
        ContentOwner: ['', Validators.required],
        Tags: ['', Validators.required],
        SubscriptionUser: [''],
        SubscriptionGroup: [''],
        FeedDescription: [''],
        FeedDisabled: [false]
      }
    });

    this.FeedForm = this.validationRuleService.SetValidationRuleOnForm(this.pageKey);

    this.validationRuleService.SetValidationsMessages({
      [this.pageKey]: {
        Name: {
          required: "Please enter name of feed"
        },

        RSSLink: {
          required: "Please enter valid RSS Link",
          rssLinkInvalid: "Not a valid url"
        },

        OfficeList: {
          required: "Please choose at least one office"
        },

        ContentOwner: {
          required: "Please choose content owner"
        },
        Tags: {
          required: "Please choose at least one tag"
        }
      }
    })

    this.Subscriptions.add(this.validationRuleService.Validate(this.FeedForm, this.pageKey, this.validationRuleService.ExecuteValidationRules.bind(this))
      .subscribe((messages) => {
        this.errorMessages = { ...messages };
      }));

    // route data start
    this.route.data.subscribe((data) => {
      this.feed = data["feed"];
      this.IsNew = this.feed.feedID ? false : true;
      if (this.IsNew) {
        this.FeedForm.markAsPristine();
        this.FeedForm.markAsUntouched();
      }
      //combobox must be filled with  data
      if (!R.isEmpty(this.feed.feedContact)) {
        this.ContentOwnerListResult = [this.feed.feedContact]
      }
      this.FeedForm.setValue({
        Name: this.feed.name,
        RSSLink: this.feed.rssLink,
        FeedDisabled: this.feed.isDisabled,
        InternalOrExternal: {
          IsInternal: this.feed.isInternal,
          ExternalTypeItem: this.feed.externalType
        },
        OfficeList: this.feed.offices,
        FeedDescription: this.feed.description,
        ContentOwner: this.feed.feedContact,
        SubscriptionGroup: this.feed.subscriptions,
        SubscriptionUser: this.feed.individualSubscriptions,
        Tags: this.feed.tags
      });


      if (this.feed.isDisabled) {
            this.checkboxChanged(true);
      }

      this.BindExternalType();
      this.BindOffices();
      this.BindContentOwner();
      this.BindTag();
      this.BindSubscriptionUsers();
      this.BindSubscriptionGroups();
    })
  }

  BindExternalType() {
    this.Subscriptions.add(this.feedService.getAllFeedType().subscribe((results) => {
      this.ExternalTypeList = results;
    }))
  }

  BindOffices() {
    this.Subscriptions.add(this.feedService.getAllOffices().subscribe((results) => {
      this.OfficeListItems = results;
    }))
  }

  BindContentOwner() {
    this.Subscriptions.add(this.feedService.getOwnerList().subscribe((results) => {
          this.ContentOwnerList = results;
    }))
  }

  BindSubscriptionUsers() {
    this.Subscriptions.add(this.feedService.getSubscribeUsers().subscribe((results) => {
      this.SubscriptionUserListItems = results;
    }))
  }

  BindTag() {
    this.Subscriptions.add(this.feedService.getTags().subscribe((results) => {
      this.TagListItems = results;
    }))
  }

  BindSubscriptionGroups() {
    this.Subscriptions.add(this.feedService.getAllSubscriptionGroups().subscribe((results) => {
      this.SubscriptionGroupListItems = results;
    }))

  }

  validateRSS() {
    const rssValue = this.FeedForm.get('RSSLink').value;
    if (rssValue) {
      this.Subscriptions.add(this.feedService.isRSSValid(rssValue).subscribe((res) => {
        this.isRssValid = res;
        this.errorMessages.RSSLink = (res) ? "" : "Not a valid url";
      }));
    };
  }

  checkboxChanged(isChecked: boolean) {
    // toggle validators
    if (isChecked) {
      //this.removeValidators();
      this.validationRuleService.RemoveValidators(this.FeedForm, (key) => key !== "Name")
    } else {
      const customValidatorList = [{ key: "InternalOrExternal", fn: InternalOrExternalValidator.bind(this) }];
      const rules = this.validationRuleService.GetValidationRules(this.pageKey);
      this.validationRuleService.AddValidators(this.FeedForm, rules, customValidatorList);
    }
  }

  save() {

  }

  ngOnDestroy() {
    this.Subscriptions.unsubscribe();
  }

}
