import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Application } from 'src/app/models/application.model';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-application-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css']
})
export class ApplicationUpdateComponent extends TranslatableComponent implements OnInit {
  data: Application[];
  price: number;
  actorid: string;
  trips = {};
  statusList = ['Pending','Due'];
  id: string;
  due='DUE'
  constructor(private fb: FormBuilder,private applicationservice: ApplicationService, private router: Router,
    private translateservice: TranslateService, private route: ActivatedRoute, private authService: AuthService,
    private tripservice: TripService) {
      super(translateservice);
     }

  ngOnInit() {

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



  
  onCreated() {

    
    /*this.applicationservice.getApplications()
    .then((val) => {

      val.forEach(val => {
        this.trips[val.status='Peding']='Due'
      });

      console.log('Listado de viajes: ' + JSON.stringify(this.trips));
    })
    .catch((err) => console.error(err.message));*/


  }

 
}
