import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { UpdateEvenementComponent } from './update-evenement/update-evenement.component';


@NgModule({
  declarations: [ListEvenementComponent, UpdateEvenementComponent],
  imports: [
    CommonModule,
    EvenementRoutingModule
  ]
})
export class EvenementModule { }
