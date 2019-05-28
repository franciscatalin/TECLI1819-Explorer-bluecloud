import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
import { MessageService } from './message.service';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private currentTrip: Trip;
  private tripUrl = `${environment.apiBaseUrl + '/trips'}`;
  constructor(private http: HttpClient, private messageService: MessageService, private cookieService: CookieService) { }

  getTrip(id: string) {
    const url = `${this.tripUrl}/${id}`;
    return this.http.get<Trip>(url).toPromise();
  }


  getCurrentTrip() {
    let result = null;
    // con getItem obtenemos el currentActor
    const currentTrip = localStorage.getItem('currentTrip');
    // Vemos si es nulo
    if (currentTrip) {
      // Si no es nulo, lo parseamos y lo devolvemos como resultado del método
      result = JSON.parse(currentTrip);
    } else {
      // En caso contrario, mostramos un mensaje que indica que no hay ningún usuario almacenado en localStorage
      // Según el caso este mensaje tendrá sentido o no
      // this.messageService.notifyMessage('auth.user.not.found', 'alert alert-danger');
    }
    return result;
  }

  getTitle(title: string) {
    const url = `${this.tripUrl}/?q=${title}`;
    return this.http.get<Trip[]>(url).toPromise();
  }

  

  getTrips() {
    
    
    return this.http.get<Trip[]>(this.tripUrl).toPromise();
    
  }

  setCurrentTrip(trip: any) {
    // Volvemos a comprobar que el actor exista y no sea nulo
    if (trip) {
      // JSON.stringify sirve para darle el formato que deseemos al JSON que se almacena en la variable currentActor.
      localStorage.setItem('currentTrip', JSON.stringify({
        ticker: trip.ticker,
    detalles: trip.detalles,
    cancelled_reason: trip.cancelled_reason,
    title: trip.title,
    cancelationMoment: trip.cancelationMoment,
    description: trip.description,
    price:trip.price,
    picture: trip.picture,
    list_requirements: trip.list_requirements,
    status: trip.status,
    date_start: trip.date_start,
    date_end: trip.date_end,
    published: trip.published,
    created: trip.created,
        
      }));
      // Cuando me logueo, si hemos recibido el token, entonces lo guardamos en una cookie
      
      // Si el actor es nulo, es debido a que venimos del método logout, así que ahora lo que hago es eliminar el actor y el token
    } else {
      localStorage.removeItem('currentTrip');
    
    }
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
