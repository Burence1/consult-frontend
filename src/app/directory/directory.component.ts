import { Component, OnInit, Inject} from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
<<<<<<< HEAD
<<<<<<< HEAD
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
=======
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
>>>>>>> 9064896c89d8d6564a340d8318cc6a4332ea5391
=======
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
>>>>>>> 9064896c89d8d6564a340d8318cc6a4332ea5391

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  profiles: Profile[];

  constructor(public authService: AuthService, private profileService: ProfileService,
<<<<<<< HEAD
<<<<<<< HEAD
    @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { 
      
    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res)
=======
=======
>>>>>>> 9064896c89d8d6564a340d8318cc6a4332ea5391
              @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) {

    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res);
<<<<<<< HEAD
>>>>>>> 9064896c89d8d6564a340d8318cc6a4332ea5391
=======
>>>>>>> 9064896c89d8d6564a340d8318cc6a4332ea5391
      }, error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
