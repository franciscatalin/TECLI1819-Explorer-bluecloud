import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../models/application.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  // Url donde está mi endpoint para acceder las aplicaciones
  private applicationUrl =  `${environment.apiBaseUrl + '/applications'}`;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // Devuelve una aplicación dado su ID
  getApplication (id: string) {
    // Añado el id a la url donde tengo las aplicaciones. http://localhost:3000/applications/id
    const url = `${this.applicationUrl}/${id}`;
    // Devuelvo la promesa de haber hecho la petición get
    return this.http.get<Application>(url).toPromise();
  }

  // Devuelve el listado de todas las aplicaciones de un actor a partir de su ID
  getApplicationsActor (actorid: string) {
    // Con el parámetro "?q=" Json Server hace una búsqueda en TODAS las aplicaciones y en TODOS los atributos de la keyword: "actorid"
    const url = `${this.applicationUrl}/?q=${actorid}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  // Devuelve el listado de todas las aplicaciones
  getApplications () {
    return this.http.get<Application[]>(this.applicationUrl).toPromise();
  }

  // Método que se ejecuta en "trip-display" cuando el usuario hace click en el botón "Solicitar Viaje" para crear una aplicación
  registerapplication (application: any) {
    return new Promise<any>((resolve, reject) => {
        const headers = new HttpHeaders ();
        headers.append ('Content-Type', 'application/json');
        const body = JSON.stringify(application);
        this.http.post (this.applicationUrl, body, httpOptions).toPromise()
          .then (res => {
            this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
            // Llamamos a "resolve" cuando resolvemos la promesa en caso satisfactorio
            resolve (res);
          }, err => { this.messageService.notifyMessage('errorMessage.auth.registration.failed', 'alert alert-danger');
        // Llamamos a "reject" cuando la promesa falla
        reject (err); });
    });
  }

  // Método que actualiza el estado de una application. ApplicationUpdateComponent sería el componente que tendría que llamar a este método
  updateApplication (application: any) {
    // Construimos la url de la aplicación que vamos a modificar. http://localhost:3000/applications/id
    const url = `${this.applicationUrl}/${application.id}`;
    // Es muy importante añadir las cabeceras para indicarle al servidor que lo que le envío a continuación es un JSON
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Encapsulo ahora el cuerpo, que no es más que el Actor pasado a JSON
    const body = JSON.stringify(application);

    return new Promise<any>((resolve, reject) => {
      // Petición put pasando el url, body y cabecera
      this.http.put(url, body, httpOptions).toPromise()
      .then(res => {
        // Si todo va bien, actualizo los atributos que tiene el authService relacionados con el actor, que tambien tiene que enterarse
        resolve(res);
      }, err => { console.log(err);
        // Llamamos a "reject" cuando la promesa falla
        reject(err); });
    });
  }
}
