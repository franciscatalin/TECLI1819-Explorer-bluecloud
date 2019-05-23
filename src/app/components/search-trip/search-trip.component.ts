import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css']
})
export class SearchTripComponent implements OnInit  { 

  data: Trip[];
  title: string;
  navigationSubscription;
  constructor(private fb: FormBuilder,
    private tripservice: TripService,
    private router: Router,
    private translateservice: TranslateService,
    public authService: AuthService,
    private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.getTrips();
      }
    });
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.title = this.route.snapshot.params['title'];
    // alert(this.title);
    this.tripservice.getTitle(this.title)
      .then((val) => {
        this.data = val;
        console.log('Listado de viajes: ' + JSON.stringify(this.data));
      })
      .catch((err) => console.error(err.message));
  }
}
