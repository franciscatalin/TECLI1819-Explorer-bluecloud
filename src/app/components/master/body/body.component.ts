import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  trips: Array<Trip>;

  constructor() { }

  ngOnInit() {
    this.trips = new Array<Trip>();
    const trip = new Trip();
    trip.title = 'Viaje a EEUU';
    trip.ticker = 'TXD123456';
    trip.description = 'Viaje por Estados Unidos de costa a costa';
    trip.price = 1.250;
    this.trips.push(trip);
  }

}
