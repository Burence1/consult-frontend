import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FollowService {

  constructor(private db: AngularFireDatabase) { }

  // tslint:disable-next-line: typedef
  getFollowers(userId: string) {
    // Used to build the follower count
    return this.db.object(`followers/${userId}`);
  }

  // tslint:disable-next-line: typedef
  getFollowing(followerId: string, followedId: string) {
    // Used to see if UserFoo if following UserBar
    return this.db.object(`following/${followerId}/${followedId}`);
  }

  // tslint:disable-next-line: typedef
  follow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}`).update({ [followerId]: true } );
    this.db.object(`following/${followerId}`).update({ [followedId]: true } );
  }

  // tslint:disable-next-line: typedef
  unfollow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}/${followerId}`).remove();
    this.db.object(`following/${followerId}/${followedId}`).remove();
  }


}
