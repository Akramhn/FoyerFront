import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { UpdateEvenementComponent } from './update-evenement/update-evenement.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';


@NgModule({
  declarations: [ ListEvenementComponent, UpdateEvenementComponent, AddEvenementComponent],
  imports: [
    CommonModule,
    EvenementRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
  ]
})
export class EvenementModule { }
