import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent extends TranslatableComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  statusList = ['Pending', 'Approved', 'Cancelle'];
  idiomlist = ['en', 'es'];

  constructor(private translateService: TranslateService,private formBuilder: FormBuilder, private tripService: TripService,
    private router: Router) { 

      super(translateService);
    }

  ngOnInit() {

    this.registerForm = this.formBuilder.group
      ({
    ticker: [''],
    detalles: [''],
    cancelled_reason: [''],
    title: [''],
    cancelationMoment: [''],
    description: [''],
    price:[''],
    picture:[''],
    list_requirements: [''],
    status: [''],
    date_start: [''],
    date_end: [''],
    published: [''],
    created: [''],
    preferredLanguage:[''],
      });

    
  }

  onPublish() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log ('Hola Mundo');
      console.log (this.registerForm.value);
      this.tripService.registerTrip (this.registerForm.value)

      .then(res => {

        console.log(res );
        //this.router.navigate(['/login']);
      }, err => { console.log(err + 'Real error'); });
  }
  }

}
