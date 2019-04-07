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
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => {
        this.messageService.notifyMessage('errorMessages.', 'messages.auth.login.correct');
        resolve();
        }).catch(error => {
          this.messageService.notifyMessage ('errorMessages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'Error on Login');
        reject(error);
        });
      });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          resolve();
      }).catch(error => {
        reject(error);
        this.messageService.notifyMessage(error.code, 'Error on Logout.');
      });
    });
}

}
