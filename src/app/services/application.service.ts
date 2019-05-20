import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../models/application.model';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationUrl =  `${environment.apiBaseUrl + '/applications'}`;
  constructor(private http: HttpClient,private messageService: MessageService) { }

  getaplication (id: string) {
   
    const url = `${this.applicationUrl}/${id}`;
    return this.http.get<Application>(url).toPromise();

  }

  
  getApplications () {
   
    
    return this.http.get<Application[]>(this.applicationUrl).toPromise();

  }


  registerapplication (application: Application ) {

    return new Promise<any>((resolve, reject) => {

        const headers = new HttpHeaders ();
        headers.append ('Content-Type', 'application/json');
        const url = `${environment.apiBaseUrl + '/applications'}`; // http://localhost:3000/actors
        const body = JSON.stringify(application);
      this.http.post (url, body, httpOptions).toPromise()
        .then (res => {
           this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
          resolve (res);
        }, err => { this.messageService.notifyMessage('errorMessage.auth.registration.failed', 'alert alert-danger');
      reject (err);
      });
      
      });
    }
}
