import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import {  HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // Variable de tipo Actor para almacenar el actor actual que se acaba de loguear
  private currentActor: Actor;
  // Observable que le sirve al header para actualizarse y mostrar una opción o otra en base al usuario que esté logueado en el sistema
  userLoggedIn = new Subject ();

  constructor(private authService: AuthService, private fireAuth: AngularFireAuth,
    private messageService: MessageService, private http: HttpClient) {
    }

    getCurrentActor() {
      return (this.currentActor);
    }

   registerUser (actor: Actor) {

    return new Promise<any>((resolve, reject) => {

      // Llamamos a firebase para registrar al usuario con el email y el password
     this.fireAuth.auth.createUserWithEmailAndPassword (actor.email, actor.password)
      .then (_ => {

        const headers = new HttpHeaders ();
        headers.append ('Content-Type', 'application/json');
        const url = `${environment.apiBaseUrl + '/actors'}`; // http://localhost:3000/actors
        const body = JSON.stringify(actor);
      this.http.post (url, body, httpOptions).toPromise()
        .then (res => {
           this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
          resolve (res);
        }, err => { this.messageService.notifyMessage('errorMessage.auth.registration.failed', 'alert alert-danger');
      reject (err);
      });
      }).catch (error => {
         this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
        reject(error);
      });
      });
    }

  getRole(): any {
    throw new Error('Method not implemented.');
  }


  login (email: string, password: string) {
    // La función devuelve una promesa ya que Firebase también devuelve una promesa
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise<any>((resolve, reject) => {
      // Le pasamos el email y el passsword a Firebase
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
        // Si todo ha ido bien en fireBase invoco a mi backend (Json Server en nuestro caso) con el email para recuperar el actor
        const url = environment.apiBaseUrl + `/actors?email=` + email; // http://localhost:3000/actors?email
        this.http.get<Actor[]>(url).toPromise()
        .then((actor: Actor[]) => {
          this.currentActor = actor[0];
          this.userLoggedIn.next(true);
          // Mensaje que se muestra cuando todo ha ido correctamente
          this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
          // Hacemos el resolve que ahora devuelve el actor actual que se acaba de loguear
          // Este resolve nos sirve para saber el actor actual y su rol en el sistema
          resolve(this.currentActor);
        }).catch(error =>  {
          reject(error);
        });
        // Si firebase devuelve algún error lo capturamos
        }).catch(error => {
        this.messageService.notifyMessage ('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
        reject(error);
        });
      });
  }


  logout() {
    // La función devuelve de nuevo una promesa ya que Firebase también devuelve una promesa
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          // Si todo ha ido bien hacemos el resolve
          resolve();
      // Si firebase devuelve algún error lo capturamos
      }).catch(error => {
        reject(error);
        this.messageService.notifyMessage(error.code, 'alert alert-danger');
      });
    });
}
}
