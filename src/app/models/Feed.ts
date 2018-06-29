import { FeedType } from "./FeedType";
import { Office } from "./Office";
import { ContentOwner } from "./ContentOwner";
import { SubscriptionGroup } from "./SubscriptionGroup";
import { Person } from "./Person";
import { Tag } from "./Tag";


export class Feed {
  feedID: Number;
  name: String;
  rssLink: String;
  status: String;
  lastSyncUpdatedOn: String;
  createdOn: String;
  createdBy: String;
  updatedOn: String;
  updatedBy: String;
  postCount: Number;
  isDisabled: Boolean;
  isInternal: Boolean;
  externalType: FeedType;
  description: String;
  offices: Office[];
  feedContact: ContentOwner;
  subscriptions: SubscriptionGroup[];
  individualSubscriptions: Person[];
  tags: Tag[];
}
