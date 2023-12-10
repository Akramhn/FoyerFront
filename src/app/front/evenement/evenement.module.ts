import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';


@NgModule({
  declarations: [
    ListEvenementComponent
  ],
  imports: [
    CommonModule,
    EvenementRoutingModule
  ],
  exports: [ListEvenementComponent],
})
export class EvenementModule { }
