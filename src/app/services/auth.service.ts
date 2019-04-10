import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import {  HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { AngularFireAuth } from 'angularfire2/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class AuthService {


  constructor(private authService: AuthService, private fireAuth: AngularFireAuth,
    private messageService: MessageService, private http: HttpClient) {
    }

   registerUser (actor: Actor) {

    return new Promise<any>((resolve, reject) => {

      // Llamamos a firebase para registrar al usuario con el email y el password
     this.fireAuth.auth.createUserWithEmailAndPassword (actor.email, actor.password)
      .then (_ => {

        const headers = new HttpHeaders ();
        headers.append ('Content-Type', 'application/json');
        const url = `${environment.backendApiBaseUrl + '/actors'}`;
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
        .then(data => {
        // Mensaje si todo ha ido correctamente
        this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
        // Si todo ha ido bien hacemos el resolve
        resolve();
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
