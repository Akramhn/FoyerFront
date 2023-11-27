import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';



@NgModule({
  declarations: [
    AddEvenementComponent,
    ListEvenementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EvenementModule { }
