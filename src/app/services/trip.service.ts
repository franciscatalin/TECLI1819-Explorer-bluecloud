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
  // Url donde está mi endpoint para acceder los trips
  private tripUrl = `${environment.apiBaseUrl + '/trips'}`;

  constructor(private http: HttpClient, private messageService: MessageService, private cookieService: CookieService) { }

  // Devuelve un trip dado su ID
  getTrip(id: string) {
    // Añado el id a la url donde tengo los trips. http://localhost:3000/trips/id
    const url = `${this.tripUrl}/${id}`;
    // Devuelvo la promesa de haber hecho la petición get
    return this.http.get<Trip>(url).toPromise();
  }

  // Devuelve el listado de todos los trips
  getTrips() {
    return this.http.get<Trip[]>(this.tripUrl).toPromise();
  }

  // Devuelve el listado de todos los viajes asociados a un determinado nombre (title)
  getTitle(title: string) {
    // Con el parámetro "?q=" Json Server hace una búsqueda en TODOS los viajes y en TODOS los atributos de la keyword: "title"
    const url = `${this.tripUrl}/?q=${title}`;
    return this.http.get<Trip[]>(url).toPromise();
  }

  // Método que almacena un nuevo viaje dentro del Json Server
  registerTrip(trip: Trip) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const url = `${environment.apiBaseUrl + '/trips'}`; // http://localhost:3000/trips
      const body = JSON.stringify(trip);
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
          // Llamamos a "resolve" cuando resolvemos la promesa en caso satisfactorio
          resolve(res);
        }, err => {
          this.messageService.notifyMessage('errorMessage.auth.registration.failed', 'alert alert-danger');
          // Llamamos a "reject" cuando la promesa falla
          reject(err);
        });

    });
  }
}
