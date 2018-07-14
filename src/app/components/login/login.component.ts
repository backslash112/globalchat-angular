import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(7)]]
    })
    // this.form.valueChanges.subscribe(v => console.log(this.form));
  }

  onSubmit() {
    console.log(`email: ${this.form.controls["email"].value}`);
    console.log(`password: ${this.form.controls["password"].value}`);
    const email = this.form.controls["email"].value;
    const password = this.form.controls["password"].value;
    const user = new User(email, password);
    this.authService.signIn(user).subscribe(
      data => {
        console.log('login success!');
        this.router.navigate(["/"]);
      },
      err => {
        console.log('login faild!');
      });
  }
}
