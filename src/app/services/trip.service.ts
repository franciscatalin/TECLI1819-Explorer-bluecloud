import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripUrl =  `${environment.apiBaseUrl + '/trips'}`;
  constructor(private http: HttpClient) { }

  getTrip (id: string) {
   
    const url = `${this.tripUrl}/${id}`;
    return this.http.get<Trip>(url).toPromise();

  }

  
  getTrips () {
   
    
    return this.http.get<Trip[]>(this.tripUrl).toPromise();

  }
}
