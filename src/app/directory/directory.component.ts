import { AngularFireList } from '@angular/fire/database';
import { Component, OnInit, Inject} from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
import { AngularFireStorage, } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  profiles: Profile[];
  user: Observable<any>;
  userEmail: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public authService: AuthService, private profileService: ProfileService, public auth: AuthService, private breakpointObserver: BreakpointObserver,
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

  SearchDirectory( ){
    
  }
  ngOnInit(): void {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        console.log(user);
      }
    });
  }

  logout() {
    this.auth.logout();
  }


}
