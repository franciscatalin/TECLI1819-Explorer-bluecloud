import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Warehouse } from '../models/warehouse.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {

  // Url donde está mi endpoint para acceder los warehouses
  private warehouseUrl =  `${environment.apiBaseUrl + '/warehouses'}`;

  constructor(private http: HttpClient) { }

  // Devuelve un Warehouse dado su ID
  getWarehouse (id: string) {
    // Añado el id a la url donde tengo los Warehouses. http://localhost:3000/warehouses/id
    const url = `${this.warehouseUrl}/${id}`;
    // Devuelvo la promesa de haber hecho la petición get
    return this.http.get<Warehouse>(url).toPromise();
  }

  // Devuelve el listado de todos los Warehouses
  getWarehouses () {
    return this.http.get<Warehouse[]>(this.warehouseUrl).toPromise();
  }
}
