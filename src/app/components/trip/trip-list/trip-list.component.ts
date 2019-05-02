import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Array<Trip>;
  data: any[];
  constructor(private tripservice: TripService,
    private translateservice: TranslateService,private router: Router, private route: ActivatedRoute) {
   
     }

  ngOnInit() {
    this.tripservice.getTrips()
    .then ((val) => {
      this.data = val;
      console.log(this.data);
     
    })
    .catch((err) => console.error(err.message));
    
    
    /*this.trips = new Array<Trip>();
    const trip = new Trip();
    trip.title = 'Viaje a EEUU';
    trip.ticker = 'TXD123456';
    trip.description = 'Viaje por Estados Unidos de costa a costa';
    trip.price = 1.250;
    this.trips.push(trip);*/
  }

  newTrip(){
   // this.route.navigate(['trips/new']);
  }

  
}