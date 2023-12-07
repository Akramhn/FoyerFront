import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';





@NgModule({
  declarations: [
    UpdatePopupComponent,
    ProfileAdminComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserBackModule { }
