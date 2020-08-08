import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UniqueEmailValidator {
    constructor(private auth: AuthService) {}

    createValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this.auth.checkEmailExists(control.value)
                .pipe(
                    map(
                        (response: Response) => {
                           if (response){
                            return   {emailexist: true};
                           }else{
                               return null;
                           }
                        },
                    ),
                    catchError(
                        (err: any) => {
                            return err.status === 404 ? of(null) : of({ emailNotUnique: true });
                        },
                    ),
                );
        };
    }
}