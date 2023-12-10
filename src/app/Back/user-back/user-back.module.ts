import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionItemDirective } from 'src/app/front/directives/accordion-item.directive';
import { HoverDirective } from '../directive2/hover.directive';





@NgModule({
  declarations: [
    ProfileAdminComponent,
    ListUserComponent,
    HoverDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],exports:[HoverDirective]
})
export class UserBackModule { }
