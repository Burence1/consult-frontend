import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  currentId: string;
  profile: Profile;
  profiles: Profile[];

  constructor( private auth: AuthService, private profileService: ProfileService) {
    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe((res) => {
            this.profile = res;
          },
          (error) => {
            console.error(error);
          });
      });
      
   }

   getSingleProfile(){
    console.log("prf",this.profile.displayName)
   }
}
