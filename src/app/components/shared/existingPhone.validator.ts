import { AsyncValidatorFn, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { ActorService } from '../../services/actor.service';

// Método que comprueba el valor del campo, si existe algún usuario con ese teléfono devuelve un error de mensaje, sino devuelve null
// Este método necesita que se le pase como parámetro el servicio de Actor ya que es el que hace las llamadas a backend
export function existingPhoneNumValidator(actorService: ActorService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return actorService.getUsersByPhoneNumber(control.value).then(
            users => {
                return (users && users.length > 0) ? {'phoneNumExists': true} : null;
                // Si devuelve null significa que no había ningún usuario con ese número de teléfono
            }
        );
    };
}
