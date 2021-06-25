import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Profile } from '../profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  // url =

  // update_url =

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {

  }

  fetchProfileApi(id: string): Observable<Profile> {
    const path = `users/${id}`;
    return this.db.object<Profile>(path).valueChanges();
  }

  fetchAllProfiles(): Observable<Profile[]> {
    const path = `/users`;
    return this.db.list<Profile>(path).valueChanges();
  }

  // get(name: string): Observable<Profile> {

  //   return this.apiService.get('/profile/' + name)
  //     .map((data: {profile: Profile}) => data.profile);
  // }

  // tslint:disable-next-line: typedef
  update(id: string, profile: Profile) {
    const path = `users/${id}`;
    this.db.object<Profile>(path).update(profile);
  }
}
