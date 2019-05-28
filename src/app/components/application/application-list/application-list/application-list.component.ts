import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  // Array de Application donde almacenamos el listado de aplicaciones
  data: Application[];
  price: number;
  actorid: string;
  trips = {};

  constructor(private fb: FormBuilder,
    private applicationservice: ApplicationService,
    private router: Router,
    private translateservice: TranslateService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tripservice: TripService) {
    super(translateservice);
  }

  ngOnInit() {
    // this.applicationservice.getApplications()
    //   .then((val) => {
    //     this.data = val;
    //     console.log('Listado de aplicaciones:' + this.data);
    //   })
    //   .catch((err) => console.error(err.message));
    this.getApplication();

    this.tripservice.getTrips()
      .then((val) => {

        val.forEach(val => {
          this.trips[val.id] = val.price;
        });

        console.log('Listado de viajes: ' + JSON.stringify(this.trips));
      })
      .catch((err) => console.error(err.message));
  }

  getApplication() {

    this.actorid = this.authService.getCurrentActor().id;
    // alert(this.title);
    this.applicationservice.getapplicationactor(this.actorid)
      .then((val) => {
        this.data = val;
        console.log('Listado de viajes: ' + JSON.stringify(this.data));
      })
      .catch((err) => console.error(err.message));
  }

}

