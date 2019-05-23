import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripUrl = `${environment.apiBaseUrl + '/trips'}`;
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTrip(id: string) {
    const url = `${this.tripUrl}/${id}`;
    return this.http.get<Trip>(url).toPromise();
  }

  getTitle(title: string) {
    const url = `${this.tripUrl}/?q=${title}`;
    return this.http.get<Trip[]>(url).toPromise();
  }

  getTrips() {
    return this.http.get<Trip[]>(this.tripUrl).toPromise();
  }

  registerTrip(trip: Trip) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const url = `${environment.apiBaseUrl + '/trips'}`; // http://localhost:3000/actors
      const body = JSON.stringify(trip);
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
          resolve(res);
        }, err => {
          this.messageService.notifyMessage('errorMessage.auth.registration.failed', 'alert alert-danger');
          reject(err);
        });

    });
  }
}
