import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { UniqueEmailValidator } from './email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  errors: string[];
  registerStatus = false;
  emailValidity = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private checkemail: UniqueEmailValidator,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], this.checkemail.createValidator()],
      password: [null, Validators.required],

    });
  }

  getErrorMessage() {
    // console.log(this.firstFormGroup.get('email').errors);
    if (this.firstFormGroup.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.firstFormGroup.get('email').hasError('email'))
    {
      return 'Not a valid email';
    }
    if (this.firstFormGroup.get('email').hasError('emailexist')) {
      return 'Email is already exist';
    }
    // return this.firstFormGroup.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  signup() {
    this.authService.register(this.firstFormGroup.value).subscribe(response => {
      this.toastr.success('Registration Successful !!', 'Success');
      this.registerStatus = true;
      this.errors = [];
      this.firstFormGroup.reset();
      Object.keys(this.firstFormGroup.controls).forEach(key => {
        this.firstFormGroup.controls[key].setErrors(null);
      });
    },
    err => {
      this.errors = err.error.errors;
      console.log(err);
    });
  }
  get email() {
    return this.firstFormGroup.get('email');
  }

  checkEmailValidity() {
    this.emailValidity = true;
    console.log(this.firstFormGroup.get('email').value);
  }


}
