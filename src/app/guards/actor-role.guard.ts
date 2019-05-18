import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  private currentActor: Actor;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise ((resolve, reject) => {
      // Con expectedRole guardo el tipo de rol que puede acceder a cada ruta concreta y que lo recibo como parámetro
      const expectedRole = next.data.expectedRole;
      // Dentro del servicio auth.service tengo un método que me devuelve el actor actual logueado y lo guardo en currentActor
      const currentActor = this.authService.getCurrentActor();
      let result = false;
      // Si currentActor = true significa que tenemos un actor logueado, es decir, el actor actual no es anónimo
      if (currentActor) {
        console.log('Valor del currentActor: ' + currentActor);
        // Vemos cual es el rol activo del actor actual y lo guardamos en activeRole
        const activeRole = new RegExp(currentActor.role.toString(), 'i');
        // Si el rol que puede ejecutar la accion está contenido en el activeRole, significa que el actor actual logueado tiene ese permiso
        if (expectedRole.search(activeRole) !== -1 ) {
          // Con result = true le estaríamos concediendo el acceso al usuario a la ruta
          result = true;
        } else {
          // Enrutamos al usuario hacia el componente de acceso denegado
          this.router.navigate(['denied-access'], { queryParams: {previousURL: state.url }});
        }
        // Resolvemos la promesa
        resolve(result);
      } else {
        // Si currentActor = false, significa que no tenemos un actor logueado, es decir, el usuario es anónimo.
        // Si el expectedRole puede ser anónimo entonces el actor actual también tendrá permiso para acceder a la ruta
        if (expectedRole.indexOf('anonymous') !== -1 ) {
          // Con result = true le estaríamos concediendo el acceso al usuario a la ruta
          result = true;
        } else {
          // En este último caso el usuario es anónimo, pero no puede ser anónimo para acceder a la ruta que está intentando entrar
          // Lo que hacemos es redirigir al usuario a la vista de login, y si el usuario hace login con el rol adecuado
          // lo redirigimos a la ruta a la que quería acceder, para eso guardamos dentro de returnUrl esa dirección a la que quería acceder
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        }
        resolve(result);
      }
    });
  }
}
