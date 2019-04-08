import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;



  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {
      // const roleList = authService.getRole();
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group
      ({
        name: [''],
        surname: [''],
        password: [''],
        mail: [''],
        phone: [''],
        address: [''],
       // role: [''],
       // preferredLanguage: [''],



      });
  }


  /*get f() { return this.registerForm.controls; }*/

  /*onRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)');
  }*/

  onRegister() {

    this.submitted = true;
    if (this.registerForm.invalid) {
    this.authService.registerUser(this.registerForm.value)
      .then(res => {

        console.log(res);
     //   this.router.navigate(['/login']);
      }, err => { console.log(err); });
  }
}
}


