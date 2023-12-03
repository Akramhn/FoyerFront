import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { UpdateEvenementComponent } from './update-evenement/update-evenement.component';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';



@NgModule({
  declarations: [AddEvenementComponent, ListEvenementComponent, UpdateEvenementComponent],
  imports: [
    CommonModule,
    EvenementRoutingModule,
  ]
})
export class EvenementModule { }
