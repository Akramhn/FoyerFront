import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { ListUniversityComponent } from './list-university/list-university.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { ReserTestComponent } from './reser-test/reser-test.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [ListUniversityComponent, ReserTestComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    UniversityRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [ListUniversityComponent, ReserTestComponent],
})
export class UniversityModule {}
