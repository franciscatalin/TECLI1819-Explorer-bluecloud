import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/security/register/register.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/security/login/login.component';


  const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    {path: 'register', component: RegisterComponent},
    { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  }
  ];



  export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
