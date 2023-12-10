import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFrontRoutingModule } from './user-front-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EtudiantProfileComponent } from './etudiant-profile/etudiant-profile.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EtudiantProfileComponent,

  ],
  imports: [
    CommonModule,
    UserFrontRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
 
})
export class UserFrontModule { }
