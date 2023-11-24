import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { AccordionItemDirective } from '../directives/accordion-item.directive';
import { AppModule } from '../app.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AddReservationComponent,AccordionItemDirective],
  imports: [CommonModule, ReservationRoutingModule,    MatExpansionModule,
  ],
  exports: [AddReservationComponent,AccordionItemDirective],
})
export class ReservationModule {}
