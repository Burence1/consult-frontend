import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<any>;
  userEmail: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private auth: AuthService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        console.log(user);
      }
    });
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.auth.logout();
  }

}
