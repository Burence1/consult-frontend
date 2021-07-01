import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FollowService } from 'src/app/services/follow/follow.service';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnDestroy {

  @Input() user;        // a user who can be followed
  @Input() currentUser; // currently logged in user

  followerCount: number;
  isFollowing: boolean;

  followers;
  following;
  username: any;
  uid: any;



  constructor(private auth: AuthService,
              private followSvc: FollowService) {
    this.auth.user.subscribe(
      (user) => {
        this.currentUser = user.displayName;
        console.log(this.currentUser);
      },
      (error) => {
        console.error(error);
      }
    );

    firebase.database().ref('users/').on('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        this.username = childData.displayName;
        this.uid = childKey;
        console.log(this.username);

      });
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    // checks if the currently logged in user is following this.user
    this.following = this.followSvc.getFollowing(this.currentUser, this.uid)
    .valueChanges().subscribe((following: any) => {

                                      this.isFollowing = following.$value;

                                    });

    // retrieves the follower count for a user's profile
    this.followers = this.followSvc.getFollowers(this.uid).valueChanges()
                                   .subscribe(followers => {

                                     this.followerCount = this.countFollowers(followers);

                                    });
  }

  // tslint:disable-next-line: typedef
  private countFollowers(followers) {
    if (followers.$value === null) { return 0; }
    else { return size(followers); }
  }


  // tslint:disable-next-line: typedef
  toggleFollow() {
    if (this.isFollowing) { this.followSvc.unfollow(this.currentUser, this.uid); }
    else { this.followSvc.follow(this.currentUser, this.uid); }
  }


  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.followers.unsubscribe();
    this.following.unsubscribe();
  }


}

