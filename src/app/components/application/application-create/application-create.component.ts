import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  statusList = ['Pending', 'Approved', 'Cancelle'];
  idiomlist = ['en', 'es'];

  constructor(private translateService: TranslateService,private formBuilder: FormBuilder, private applicationService: ApplicationService,
    private router: Router) {
 
     }

  ngOnInit() {
    this.registerForm = this.formBuilder.group
      ({
        actorid: [''],
        actorname:[''],
        tripid:[''],
        tripname: [''],
        status:[''],
        comment:[''],
        reject_reason:[''],
        if_paid:[''],
        validated: [''],
        cancelationMoment: [''],
        created: [''],
        preferredLanguage:[''],
      });
    
  }

  onCreated() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log ('Hola Mundo');
      console.log (this.registerForm.value);
      this.applicationService.registerapplication (this.registerForm.value)

      .then(res => {

        console.log(res );
        //this.router.navigate(['/login']);
      }, err => { console.log(err + 'Real error'); });
  }
  }
}
