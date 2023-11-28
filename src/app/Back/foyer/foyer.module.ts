import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { ListFoyerComponent } from './list-foyer/list-foyer.component';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';
import { UpdateFoyerComponent } from './update-foyer/update-foyer.component';


@NgModule({
  declarations: [
    ListFoyerComponent,
    AddFoyerComponent,
    UpdateFoyerComponent
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule
  ]
})
export class FoyerModule { }
