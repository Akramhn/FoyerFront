import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { UpdateEvenementComponent } from './update-evenement/update-evenement.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';
import { AddModalEvenementComponent } from './add-modal-evenement/add-modal-evenement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QrcodepopupComponent } from './qrcodepopup/qrcodepopup.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { HOVERTableDirective } from '../directive2/hovertable.directive';





@NgModule({
  declarations: [ ListEvenementComponent, UpdateEvenementComponent, AddEvenementComponent, AddModalEvenementComponent, QrcodepopupComponent,  HOVERTableDirective],
  imports: [
    
    CommonModule,
    EvenementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    NgxQRCodeModule
  ]
})
export class EvenementModule { }
