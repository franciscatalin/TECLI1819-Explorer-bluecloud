import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { HeaderComponent } from './components/master/header/header.component';
import { MessageComponent } from './components/master/message/message.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';

  // Initialize Firebase
  export const firebaseConfig = {
    apiKey: 'AIzaSyBnfa4AS5RbsdbzQNcwojO2NEHUGQ4BMyY',
    authDomain: 'login-cbea5.firebaseapp.com',
    databaseURL: 'https://login-cbea5.firebaseio.com',
    projectId: 'login-cbea5',
    // tslint:disable-next-line:quotemark
    storageBucket: "login-cbea5.appspot.com",
    messagingSenderId: '1001254469097'
  };

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    TripListComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
