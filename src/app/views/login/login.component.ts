import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { IUser } from 'src/app/models/userModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userlogin = true;
  loading: boolean = false;
  signInForm!: FormGroup;
  showAlert: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {

        // Create the form
        this.signInForm = this._formBuilder.group({
          email     : ['', [Validators.required, Validators.email]],
          password  : ['', Validators.required],
          rememberMe: ['']
      });

  }



  showMessage(text: string, icon: any) {
    swal
      .fire({
        text: text,
        icon: icon,
      })
      .then((result) => {});
  }


/**
 * Sign in
 */
signIn(): void
{
  
  this.loading = true;
  // Return if the form is invalid
  if (this.signInForm.invalid) {
    return;
  }
  this.signInForm.value.password = CryptoJS.AES.encrypt(
    this.signInForm.value.password,
    'password'
  ).toString();
  this.signInForm.disable();
    const user = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }
  this._service.signIn(user).subscribe(
    (token) => {
      this.loading = false;
      
      if (token != null) {
        debugger
        localStorage.setItem('token', JSON.stringify(token));
        const redirectURL =
        this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
        '/usuarios/lista';
      this._route.navigateByUrl(redirectURL);
      }
      
    },
    (Response) => {
      this.signInForm.enable();
      this.loading = false;
      this.showMessage(Response.error.message, 'error');
    }
  );
}

}
