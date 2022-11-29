import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(
        '',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ),
      password: new FormControl(
        '', [
          Validators.required
        ]
      )
    })
  }

  get loginEmail() {
    return this.formLogin.get('email');
  }

  get loginPassword() {
    return this.formLogin.get('password');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error, 'Ha ocudido un error', {
          timeOut: 3000,
        });
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error, 'Ha ocudido un error', {
          timeOut: 3000,
        });
      });
  }

}
