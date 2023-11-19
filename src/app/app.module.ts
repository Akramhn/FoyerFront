import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { UniversityModule } from './university/university.module';
import { register } from 'swiper/element/bundle';
import { ValueComponent } from './value/value.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

register();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LogoComponent,
    ValueComponent,
    AccordionItemDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UniversityModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
