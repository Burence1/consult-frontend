import { User } from 'src/app/classes/user/user';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FollowService } from 'src/app/services/follow/follow.service';
import { ProfileService } from 'src/app/services/profile.service';
import { size } from 'lodash';
import { Profile } from 'src/app/profile';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnDestroy {

  @Input() user: User = new User();        // a user who can be followed
  @Input() currentUser; // currently logged in user

  followerCount: number;
  isFollowing: boolean;

  followers;
  following;
  profiles: Profile[];


  constructor(private followSvc: FollowService,
              private profileService: ProfileService ) {
    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res);
      }, error => {
        console.error(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    const userId = this.user.uid;
    const currentUserId = this.currentUser.uid;
    // console.log(this.currentUser)

    // checks if the currently logged in user is following this.user
    this.following = this.followSvc.getFollowing(currentUserId, userId).valueChanges()
                                   .subscribe((following: any)  => {

                                      this.isFollowing = following;

                                    });

    // retrieves the follower count for a user's profile
    this.followers = this.followSvc.getFollowers(userId).valueChanges()
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
    const userId = this.user.uid;
    console.log(userId);
    const currentUserId = this.currentUser.uid;
    // console.log(currentUserId);

    if (this.isFollowing) { this.followSvc.unfollow(currentUserId, userId); }
    else { this.followSvc.follow(currentUserId, userId); }
  }


  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.followers.unsubscribe();
    this.following.unsubscribe();
  }

}

