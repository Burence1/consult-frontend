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

  email: any;
  password: any;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.authService.login(formData.value.email, formData.value.password);
    }
  }

}
