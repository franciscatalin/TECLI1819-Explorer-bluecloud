import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Warehouse[]; 
  constructor(private warehouseservice: WarehouseService,
    private translateservice: TranslateService,private router: Router, private route: ActivatedRoute) {
   
     }

  ngOnInit() {
    this.warehouseservice.getWarehouses()
    .then ((val) => {
      this.data = val;
      console.log('Listado de warehorse:' + this.data);
    })
    .catch((err) => console.error(err.message));
  }
  


}
