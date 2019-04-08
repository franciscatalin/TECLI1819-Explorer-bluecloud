import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import {  HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  http: any;

  constructor(private authService: AuthService, private fireAuth: AngularFireAuth,
    private messageService: MessageService) {
    }

   registerUser (actor: Actor) {

    return new Promise<any>((resolve, reject) => {

     this.fireAuth.auth.createUserWithEmailAndPassword (actor.email, actor.password)
      .then (_ => {

        const headers = new HttpHeaders ();
        headers.append ('Content-Type', 'application/json');
        const url = `${environment.backendApiBaseUrl + '/actor'}`;
        const body = JSON.stringify(actor);
      this.http.post (url, body).toPromise()
        .then (res => {
           this.messageService.notifyMessage('404', 'messages.auth.registration.correct');
          resolve (res);
        }, err => { this.messageService.notifyMessage('404', 'errorMessage.auth.registration.failed');
      reject (err);
      });
      }).catch (error => {
         this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'Error on Login');
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
        this.messageService.notifyMessage('errorMessages.', 'messages.auth.login.correct');
        // Si todo ha ido bien hacemos el resolve
        resolve();
        // Si firebase devuelve algún error lo capturamos
        }).catch(error => {
        // Para la primera entrega no es necesario implementar los mensajes
        // this.messageService.notifyMessage ('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'Error on Login');
        reject(error);
        });
      });
  }

  logout() {
    // La función devuelve de nuevo una promesa ya que Firebase también devuelve una promesa
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          // Si todo ha ido bien hacemos el resolve
          resolve();
      // Si firebase devuelve algún error lo capturamos
      }).catch(error => {
        reject(error);
        // Para la primera entrega no es necesario implementar los mensajes
        // this.messageService.notifyMessage(error.code, 'Error on Logout.');
      });
    });
}

}
