import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {
  applicationForm: FormGroup;
  submitted = false;
  statusList = ['Pending', 'Approved', 'Cancelle'];
  idiomlist = ['en', 'es'];
  actor: Actor;
  trip: Trip;
  

  constructor(private translateService: TranslateService,private formBuilder: FormBuilder, private applicationService: ApplicationService,
    private router: Router,private authservice: AuthService,private actorService: ActorService) {
 
     }

  ngOnInit() {
    const application = new Application();
    console.log (this.authservice.getCurrentActor().id);
    application.actorid = this.authservice.getCurrentActor().id
    

   /* application.tripid = */
    this.applicationForm = this.formBuilder.group
      ({
       
        tripname: [''],
        status:['Pending'],
        comment:[''],
        reject_reason:[''],
        if_paid:[''],
        validated: [''],
        cancelationMoment: [''],
        created: [''],
        preferredLanguage:[''],
      });

 /*     const currentActor = this.authservice.getCurrentActor();
      if (currentActor) {
        const idActor = this.authservice.getCurrentActor().id;
        this.actorService.getActor(idActor).then((actor) => {
          this.actor = actor;
          console.log('createForm');
          console.log(JSON.stringify(actor));
          if (actor) {
            this.applicationForm.controls['actorid'].setValue(actor.id);
            this.applicationForm.controls['actorname'].setValue(actor.name);
          //  this.applicationForm.controls['tripid'].setValue(trip.tripid);
         //   this.applicationForm.controls['email'].setValue(actor.email);
          //  this.applicationForm.controls['password'].setValue(actor.password);
         //   this.applicationForm.controls['phone'].setValue(actor.phone);
       //     this.applicationForm.controls['preferredLanguage'].setValue(actor.preferredLanguage);
       //     this.applicationForm.controls['role'].setValue(actor.role);
       //     this.applicationForm.controls['address'].setValue(actor.address);
    
  }
}
    
    
  
}*/
  }

  
  onCreated() {
    const price=
    this.submitted = true;
    if (this.applicationForm.valid) {
      console.log ('Hola Mundo');
      console.log (this.applicationForm.value);
      this.applicationService.registerapplication (this.applicationForm.value)

      .then(res => {

        console.log(res );
        //this.router.navigate(['/login']);
      }, err => { console.log(err + 'Real error'); });
  }
  }


  
}
