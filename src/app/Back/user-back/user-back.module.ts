import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    ProfileAdminComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ]
})
export class UserBackModule { }
