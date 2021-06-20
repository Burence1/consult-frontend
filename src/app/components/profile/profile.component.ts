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

  isHovering: boolean;

  files: File[] = [];
  route: any;
  profile: Profile;
  currentId: string;

  departmentInput: string;
  positionInput: string;
  contactInput: number;
  displayNameInput: string;
  imageInput: string
  interest1Input: string
  interest2Input: string
  interest3Input: string

  showForm: boolean=false

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
    this.profile.image = this.imageInput;
    this.profile.interest1 = this.interest1Input
    this.profile.interest2 = this.interest2Input
    this.profile.interest3 = this.interest3Input
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
  toggleForm(){
    this.showForm=!this.showForm
  }

  hideForm(){
    this.showForm=false
  }

  // tslint:disable-next-line: typedef
  signOut() {
    this.authService.logout();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
