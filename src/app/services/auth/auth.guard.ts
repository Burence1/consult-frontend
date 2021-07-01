import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged((user) => {
            if (user) {

                // if (!user.emailVerified)                            // if the user hasn't verified their email, send them to that page
                //     this.router.navigate(['/verify-email']);

                resolve(true);
            } else {
                console.log('Auth Guard: user is not logged in');
                this.router.navigate(['/login']);                   // a logged out user will always be sent to home
                resolve(false);
            }
        });
    });
  }

  constructor(private router: Router, private auth: AngularFireAuth){}
  
}
