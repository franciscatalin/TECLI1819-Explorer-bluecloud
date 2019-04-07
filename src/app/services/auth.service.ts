import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';
import { headersToString } from 'selenium-webdriver/http';
import { Actor } from '../models/actor.model';
import {  HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private authService: AuthService,
    private messageService: MessageService) {
    }

  registerUser(value: any) {
    throw new Error("Method not implemented.");
  }
  fireAuth: any;

  getRole(): any {
    throw new Error('Method not implemented.');
  }

  login (email: string, password: string) {
    // La función devuelve una promesa ya que Firebase también devuelve una promesa
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
