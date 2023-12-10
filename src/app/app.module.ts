import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './front/header/header.component';
import { HomeComponent } from './front/home/home.component';
import { FooterComponent } from './front/footer/footer.component';
import { LogoComponent } from './front/logo/logo.component';
import { UniversityModule } from './front/university/university.module';
import { register } from 'swiper/element/bundle';
import { ValueComponent } from './front/value/value.component';
import { AccordionItemDirective } from './front/directives/accordion-item.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationModule } from './reservation/reservation.module';
import { ReserTestComponent } from './front/reser-test/reser-test.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { Error404Component } from './error404/error404.component';
import { FrontOfficeComponent } from './front/front-office/front-office.component';

import { ContactComponent } from './front/contact/contact.component';
import { GetStartedComponent } from './front/get-started/get-started.component';
import { HttpClientModule } from '@angular/common/http';
import { BlocModule } from './Back/bloc/bloc.module';
import { DashboardComponent } from './Back/dashboard/dashboard.component';
import { SidebarBackComponent } from './Back/sidebar-back/sidebar-back.component';
import { BackoffComponent } from './Back/backoff/backoff.component';
import { HeaderBackComponent } from './Back/header-back/header-back.component';
import { FoyerModule } from './Back/foyer/foyer.module';
import { ChambreModule } from './Back/chambre/chambre.module';
import { MaterialModule } from 'src/material.module';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import { EvenementModule } from './Back/evenement/evenement.module';
import { ParticipationModule } from './Back/participation/participation.module';


register();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LogoComponent,
    ValueComponent,
    ReserTestComponent,
    HeaderBackComponent,
    BackoffComponent,
    Error404Component,
    FrontOfficeComponent,
    SidebarBackComponent,
    DashboardComponent,
    ContactComponent,
    GetStartedComponent,
    AccessdeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UniversityModule,
    BrowserAnimationsModule,
    ReservationModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ChambreModule,
    HttpClientModule,
    FoyerModule,
    BlocModule,
    MaterialModule,
    RouterModule.forRoot([]),
    RouterModule ,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    EvenementModule,
    ParticipationModule,
    
    
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
