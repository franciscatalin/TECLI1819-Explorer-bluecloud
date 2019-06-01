import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})

export class TripDisplayComponent extends TranslatableComponent implements OnInit {
  trip = new Trip();
  application = new Application();
  id: string;
  submitted = false;
  applicationForm: FormGroup;

  constructor(private tripservice: TripService,
    private applicationservice: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private translateservice: TranslateService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    super(translateservice);
  }

  ngOnInit() {
    // A partir del listado de trips, el usuario selecciona un viaje que tiene un id concreto que se pasa por la URL y que aquí recuperamos
    this.id = this.route.snapshot.params['id'];
    // Una vez que ya tenemos el id, podemos usarlo para recuperar el trip completo
    this.tripservice.getTrip(this.id)
      // Las llamadas a los métodos de los servicios como suelen generar llamadas a backend no devuelven el objeto sino que devuelven promesas
      // De manera que cuando se resuelva la promesa, lo que me devuelve el método "getTrip" es un trip que se guarda en la variable trip
      .then((val) => {
        this.trip = val;
        console.log('Trip id:' + this.trip.id);
      })
      .catch((err) => {
        console.error(err);
      }
      );
  }

  // Método que se ejecuta cuando el usuario hace click en el botón "Solicitar Viaje" para crear una aplicación
  onCreated() {
    const applicationjson = {
      ticker: this.trip.ticker,
      actorid: this.authService.getCurrentActor().id,
      actorname: this.authService.getCurrentActor().name,
      tripid: this.trip.id,
      tripname: this.trip.title,
      status: this.trip.status,
      comment: this.application.comment,
      reject_reason: '',
      if_paid: '',
      validated: '',
      cancelationMoment: '',
      created: new Date()
    };

    console.log(applicationjson);
    this.applicationservice.registerapplication(applicationjson)
    .then((val) => {
      // this.trip = val;
      console.log(val);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}
