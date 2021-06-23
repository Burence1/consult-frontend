import { Component, OnInit, Inject} from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileServiceService } from 'src/app/services/files/file-service.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  profile: Profile;
  currentId: string;

  constructor(public authService: AuthService, private profileService: ProfileService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileServiceService) private fileService: FileServiceService) { 
      
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

  ngOnInit(): void {
  }

}
