import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(
        '',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ),
      password: new FormControl(
        '', [
          Validators.required,
          Validators.pattern("^.{6,}$")
        ]
      )
    })
  }

  ngOnInit(): void {
  }

  get regEmail() {
    return this.formReg.get('email');
  }

  get regPassword() {
    return this.formReg.get('password');
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error, 'Ha ocudido un error', {
          timeOut: 3000,
        });
      });
  }

}
