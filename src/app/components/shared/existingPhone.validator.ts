import { AsyncValidatorFn, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { ActorService } from '../../services/actor.service';

/*
export function existingPhoneNumValidator(actorService: ActorService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return actorService.getUsersByPhoneNumber(control.value).then(
            users => {
                return (users && users.length > 0) ? {'phoneNumExists': true} : null;
            }
        );
    };
}*/
