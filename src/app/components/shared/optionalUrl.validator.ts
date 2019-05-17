import { AbstractControl } from '@angular/forms';

// Método de validación custom para el campo foto
// La función recibe un control, es decir, un campo de formulario
export function ValidateURLOptional(control: AbstractControl) {
// Vamos a comprobar si en el caso de que le introduzcamos un valor a la foto, empieza por http
// ojo, la foto es opcional, es decir, si no pongo ninguna foto, no pasará nada
    if (control.value != null) {
            // Para comprobar si es una url simplemente vamos a mirar que empiece por http
            if (!control.value.startsWith('http')) {
                return { validUrl: false };
            }
            // Si no es una url correcta, devolvemos el error de validación
            // validUrl será por lo que tendremos que preguntar en el html
        } else if (control.value === 'undefined') {
            return { validUrl: true };
        }
        return null;
}
