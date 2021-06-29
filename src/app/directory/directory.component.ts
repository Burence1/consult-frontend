import { Component, OnInit, Inject} from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  searchText = '';
  profiles: Profile[];

  constructor(public authService: AuthService, private profileService: ProfileService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) {
    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res);
      }, error => {
        console.error(error);
      }
    );
  }
  ngOnInit(): void {
  }

   // tslint:disable-next-line: typedef
   filterCondition(profile) {
     const search = profile.displayName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
     console.log(search);
     return search;
  }
}
