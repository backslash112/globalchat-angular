import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AsyncEmailValidator } from '../../validators/async-email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private asyncEmailValidator: AsyncEmailValidator) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email], [this.asyncEmailValidator]],
      password: ["", [Validators.required, Validators.minLength(7)]]
    })
    // console.dir(this.form);
    this.form.valueChanges.subscribe(v => {
      // console.dir(this);
    })
  }

  onSubmit() {
    console.log(`email: ${this.form.controls["email"].value}`);
    console.log(`password: ${this.form.controls["password"].value}`);
    console.log(this.form.valid);
    console.dir(this.form.errors);
    const email = this.form.controls["email"].value;
    const password = this.form.controls["password"].value;
    const user = new User(email, password);
    this.authService.signUp(user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.dir(err);
        alert(err.error.error.message);
      });
  }
}
