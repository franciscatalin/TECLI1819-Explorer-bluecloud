import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  rolelist: any;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
    this.rolelist = authService.getRole();
    this.createForm();
  }
  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      mail: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [''],
      validated: ['true'],

    });

  }

  OnRegister() {

   /* this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        console.log(res);
        this.router.navigate(['/login']);
      }, err => { console.log(err); });*/
  }


  ngOnInit() {
  }

}
