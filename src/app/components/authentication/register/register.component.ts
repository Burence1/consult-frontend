import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password: any;
  displayName:any;

  matcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.emailSignup(
        formData.value.email,
        formData.value.password,
        formData.value.displayName,
      );
    }
  }

  showSuccess() {
    this.toastr.info('Hello world!', 'Welcome', {    timeOut: 3000,
    });
  }
}
