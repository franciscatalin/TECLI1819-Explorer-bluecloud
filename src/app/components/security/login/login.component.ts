import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends TranslatableComponent {
  private email: string;
  private returnUrl: string;

  constructor(private authService: AuthService,
      private translateService: TranslateService,
      private route: ActivatedRoute,
      private router: Router,
      private messageService: MessageService) {
      super (translateService);
    }

    // tslint:disable-next-line: use-life-cycle-interface
    ngOnInit () {
      // Recuperamos la ruta a la que el usuario estaba intentando acceder (si existe) o la ruta que tengamos configurada como inicio
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

   onLogin (form: NgForm) {
      // Recogemos las variables email y password del formulario
      const email = form.value.email;
      const password = form.value.password;
      // Operación asíncrona en donde tengo que esperar que Firebase compruebe que el usuario existe en la BBDD y me devuelva una promesa
      this.authService.login(email, password).then(_ => {
      // Reseteamos el formulario
      form.reset();
      // Una vez que el usuario ya se ha logueado correctamente, lo enviamos a lo que corresponda según la variable returUrl
      this.router.navigateByUrl(this.returnUrl);
      // Si firebase me devuelve algún código de error lo capturamos
   }).catch((error) =>  {
      console.log(error);
      // Firebase devuelve los mensajes de error con el caracter "/" y con el caracter "-" que nosotros aquí reemplazamos por "."
      // El segundo parámetro que enviamos al método es el "cssClass" y sirve para indicar el estilo del error: info, warning, danger, etc
      this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
   });
}

onLogout () {
  this.authService.logout()
  .then(_ => {
    this.email = null;
  }).catch(error => {
    console.log(error);
  });
}
}
