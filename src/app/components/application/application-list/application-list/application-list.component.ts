import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  // Array de Application donde almacenamos el listado de aplicaciones
  data: Application[];

  constructor(private fb: FormBuilder,
    private applicationservice: ApplicationService,
    private router: Router,
    private translateservice: TranslateService,
    private route: ActivatedRoute) {
    super(translateservice);
  }

  ngOnInit() {
    this.applicationservice.getApplications()
    .then ((val) => {
      this.data = val;
      console.log('Listado de aplicaciones:' + this.data);
    })
    .catch((err) => console.error(err.message));
  }
}
