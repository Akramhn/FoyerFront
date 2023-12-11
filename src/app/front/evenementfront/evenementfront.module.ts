import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementfrontRoutingModule } from './evenementfront-routing.module';
import { ListEvenementfComponent } from './list-evenementf/list-evenementf.component';


@NgModule({
  declarations: [
    ListEvenementfComponent
  ],
  imports: [
    CommonModule,
    EvenementfrontRoutingModule
  ],
  exports:[ListEvenementfComponent]
})
export class EvenementfrontModule { }
