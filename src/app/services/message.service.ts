import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoMessage } from '../components/master/message/infomessage';

export class MessageService {
  message: Subject<InfoMessage>;


  constructor() {
    this.message = new Subject();
   }

  notifyMessage (code: string, typeMessage: string) {
    this.message.next(new InfoMessage (code, typeMessage));
  }

  removeMessage () {
    this.message.next();
  }
}
