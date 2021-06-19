import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  loginGoogle() {
    this.authService.googleLogin();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
