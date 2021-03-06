import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  email: any;
  password: any;
  confirmPassword: any;
  displayName: any;

  constructor(public authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line: typedef
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.emailSignup(
        formData.value.displayName,
        formData.value.email,
        formData.value.password,
        formData.value.confirmPassword
      );
    }
  }

}
