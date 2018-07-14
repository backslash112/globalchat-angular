

import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Directive } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { map } from "../../../node_modules/rxjs/operators";

@Directive({
  selector: '[uniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true }]
})
export class UniqueEmailDirective implements AsyncValidator {

  constructor(private authService: AuthService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.authService.validateEmail(control.value)
      .toPromise()
      .then(isValid => {
        if (isValid) {
          return null;
        }
        return { uniqueEmail: true }
      })
  }
}