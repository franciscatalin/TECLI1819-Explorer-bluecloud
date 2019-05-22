import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

// Todos los métodos relacionados con los actores irían en este servicio
// excepto aquellos métodos que tengan que ver con la autenticación, login, logout, etc que irían a auth.service

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ActorService {

  token: string;
  userRole: string;
  // Url donde está mi endpoint para acceder los actores
  private apiUrl = environment.apiBaseUrl + '/actors';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Devuelve un actor dado su ID
  getActor(id: string) {
      // Añado el id a la url donde tengo los actores. http://localhost:3000/actors/id
      const url = `${this.apiUrl}/${id}`;
      // Devuelvo la promesa de haber hecho la petición get
      return this.http.get<Actor>(url).toPromise();
    }

    // Método que nos devuelve el listado de usuarios que tienen como atributo teléfono el valor pasado como parámetro
   getUsersByPhoneNumber (phoneNum: string): Promise<Actor[]> {
     return this.http.get<Actor[]>(this.apiUrl + '?phone=' + phoneNum).toPromise();
   }
   // Se podría haber resuelto más elegantemente si el backend nos devolviera únicamente el número de usuarios que tienen dicho teléfono
   // o un booleano indicando si existe al menos alguno que lo tenga. Sin embargo, al trabajar con JSON server esa lógica 
   // habría que implementarla en un middleware, aumentando la complejidad innecesariamente.

  // Este método hace un put en el Json Server de un actor que recibe como parámetro
  updateProfile(actor: Actor) {
    // Construimos la url del actor que vamos a modificar. http://localhost:3000/actors/id
    const url =  `${this.apiUrl}/${actor.id}`;
    // Es muy importante añadir las cabeceras para indicarle al servidor que lo que le envío a continuación es un JSON
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Encapsulo ahora el cuerpo, que no es más que el Actor pasado a JSON
    const body = JSON.stringify(actor);

    return new Promise<any>((resolve, reject) => {
      // Petición put pasando el url, body y cabecera
      this.http.put(url, body, httpOptions).toPromise()
      .then(res => {
        // Si todo va bien, actualizo los atributos que tiene el authService relacionados con el actor, que tambien tiene que enterarse
        const token = this. authService.getCurrentActor().customToken;
        this.authService.setCurrentActor(actor, token);
        resolve(res);
      }, err => { console.log(err); reject(err); });
    });
  }
}
