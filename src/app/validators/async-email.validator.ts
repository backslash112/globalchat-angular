import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AsyncEmailValidator implements AsyncValidator {

  constructor(private authService: AuthService) { }
  
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Observable(observer => {
      this.authService.validateEmail(control.value)
        .subscribe(
          isValid => {
            if (isValid) {
              observer.next(null);
            } else {
              observer.next({ uniqueEmail: true });
            }
          },
          err => { },
          () => {
            observer.complete();
          });
    });
  }
}