import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';
import { headersToString } from 'selenium-webdriver/http';
import { Actor } from '../models/actor.model';
import {  HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerUser(value: any) {
    throw new Error("Method not implemented.");
  }
  fireAuth: any;
  getRole(): any {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
