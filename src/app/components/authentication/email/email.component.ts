import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password: any;

  // tslint:disable-next-line: typedef
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.login(formData.value.email, formData.value.password);
    }
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
