import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from '../front-office/front-office.component';
import { Error404Component } from 'src/app/error404/error404.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFrontRoutingModule { }
