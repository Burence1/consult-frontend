import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';
import { User } from 'src/app/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  route: any;
  profile: Profile;
  currentId: string;

  departmentInput: string;
  positionInput: string;
  contactInput: number;
  displayNameInput: string;

  constructor(public authService: AuthService, private profileService: ProfileService) {
    this.findProfiles();
    this.authService.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            console.log(res)
    
          }, error => {
            console.error(error);
          }
        );
      }, error => {
        console.error(error);
      }
    );
  }

  findProfiles() {
    
  }

  updateProfile() {
    this.profile.department = this.departmentInput;
    this.profile.position = this.positionInput;
    this.profile.contact = this.contactInput;
    this.profile.displayName = this.displayNameInput;
    this.profileService.update(this.currentId, this.profile);
  }

  // profile: Profile;
  // currentUser: User;
  // isUser: boolean;

  ngOnInit(): void {
    // this.route.data.subscribe(
    //   (data: {profile: Profile}) => {
    //     this.profile = data.profile;
    //   }
    // );
  }

  // tslint:disable-next-line: typedef
  signOut() {
    this.authService.logout();
  }
}
