import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent implements OnInit {
  trip = new Trip();
  id: string;
  constructor(private tripservice: TripService,
    private translateservice: TranslateService,private router: Router, private route: ActivatedRoute) {
    
     }

  ngOnInit() {
    //Recover id param
    this.id = this.route.snapshot.params['id'];
    //Recover item
    this.tripservice.getTrip(this.id)
	.then ((val)=> {
		this.trip = val;
		console.log ('item detail:' + this.trip.id);
	})
	.catch((err)=> {
		console.error (err);

  }
  );
  }

}
