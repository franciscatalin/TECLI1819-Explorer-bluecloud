import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import locales from '@angular/common/locales/es';


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
import { config } from 'rxjs';
import { routes } from './app.routes';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { v } from '@angular/core/src/render3';
import { FooterComponent } from './components/master/footer/footer.component';
import { HomeComponent } from './components/shared/home/home.component';
import { BodyComponent } from './components/master/body/body.component';

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

  registerLocaleData(locales, 'es');
  // Esta función nos permite crear un nuevo loader que usaremos para hacer las traducciones
  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    TripListComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MessageComponent,
    TranslatableComponent,
    FooterComponent,
    HomeComponent,
    BodyComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
