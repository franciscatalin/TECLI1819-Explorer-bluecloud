import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  // Aquí guardamos el actor que está logueado actualmente en el sistema
  // Si el actor es un administrador aparecerá un botón para editar cada uno de los viajes, en caso contrario no se mostrará
  actor: Actor;
  // Array de Trips donde almacenamos el listado de viajes
  data: Trip[];

  constructor(private fb: FormBuilder,
    private tripservice: TripService,
    private router: Router,
    private translateservice: TranslateService,
    public authService: AuthService,
    private route: ActivatedRoute) {
      super (translateservice);
     }

  ngOnInit() {
    // El método getTrips devuelve el listado de todos los trips
    this.tripservice.getTrips()
    .then ((val) => {
      this.data = val;
      console.log('Listado de viajes: ' + this.data);
    })
    .catch((err) => console.error(err.message));

    // Actor logueado en el sistema
    this.actor = this.authService.getCurrentActor();
  }

  // Método para que los manager y administradores puedan crear un nuevo viaje. Los exploradores no podrían.
  newTrip() {
    this.router.navigate(['/TripCreateComponent']);
   }
}
