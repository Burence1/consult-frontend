import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password: any;
  confirmPassword: any;

  // tslint:disable-next-line: typedef
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.emailSignup(
        formData.value.email,
        formData.value.password
      );
    }
  }
}


