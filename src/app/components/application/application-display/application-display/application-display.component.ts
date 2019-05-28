import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.css']
})
export class ApplicationDisplayComponent implements OnInit {

  application = new Application();
  id: string;

  actorid: string;
  constructor(private applicationservice: ApplicationService,
     private router: Router, private route: ActivatedRoute,
     private translateservice: TranslateService, private authservice: AuthService ) {
     
     }

  ngOnInit() {
    
    // A partir del listado de application, el usuario selecciona una aplicación que tiene un id concreto que se pasa por la URL y que aquí recuperamos
    this.id = this.route.snapshot.params['id'];
    // Una vez que ya tenemos el id, podemos usarlo para recuperar la reserva o aplicación completo
    this.applicationservice.getaplication(this.id)
    // Las llamadas a los métodos de los servicios como suelen generar llamadas a backend no devuelven el objeto sino que devuelven promesas
    // De manera que cuando se resuelva la promesa, lo que me devuelve el método "getApplication" es una aplicación que se guarda en la variable trip
    .then ((val) => {
      this.application = val;
      console.log ('Trip id:' + this.application.id);
    })
    .catch((err) => {
      console.error (err);
  }
  );
}

}
