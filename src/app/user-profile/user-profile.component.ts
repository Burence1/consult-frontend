import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profiles: Profile[];

  name = '!!!';
  viewMode = 'tab1';

  profile: Profile;
  currentId: string;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private profileService: ProfileService,
    @Inject(AngularFireStorage)
    private storage: AngularFireStorage,
    @Inject(FileService)
    private fileService: FileService
  ) {}

  findProfiles() {
    
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('profile.id');
    this.profileService.fetchProfileApi(this.currentId).subscribe(
      (res) => {
        this.profile = res;

      }, error => {
        console.error(error);
      }
    );
  }
}
