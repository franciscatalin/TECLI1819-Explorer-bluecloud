import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  warehouse: Array<Warehouse>;
  data: any[];
  constructor(private warehouseservice: WarehouseService,
    private translateservice: TranslateService,private router: Router, private route: ActivatedRoute) {
   
     }

  ngOnInit() {
  }


}
