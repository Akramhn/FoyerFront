import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from './Back/backoff/backoff.component';
import { Error404Component } from './error404/error404.component';
import { FrontOfficeComponent } from './front/front-office/front-office.component';
import { DashboardComponent } from './Back/dashboard/dashboard.component';
import { LoginComponent } from './front/user-front/login/login.component';
import { RegisterComponent } from './front/user-front/register/register.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuardGuard } from './guard/admin/admin-guard.guard';
import { EtudiantGuardGuard } from './guard/etudiant/etudiant-guard.guard';
import { EtudiantProfileComponent } from './front/user-front/etudiant-profile/etudiant-profile.component';
import { ProfileAdminComponent } from './Back/user-back/profile-admin/profile-admin.component';
import { ListUserComponent } from './Back/user-back/list-user/list-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: BackoffComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to 'dashboard' by default
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard,AdminGuardGuard] },
      { path: 'profile', component: ProfileAdminComponent,canActivate:[AuthGuard,AdminGuardGuard] },
      {path:"ListUsers", component:ListUserComponent,canActivate:[AuthGuard,AdminGuardGuard]},
      {
        path: 'chambre',
        loadChildren: () =>
          import('./Back/chambre/chambre.module').then((m) => m.ChambreModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./Back/user-back/user-back.module').then((m) => m.UserBackModule),
      }
    ],
  },
  {
    path: 'etudiant',
   
    children: [
      { path: 'etudiantProfile', component: EtudiantProfileComponent,canActivate:[AuthGuard,EtudiantGuardGuard] },



      {
        path: 'bloc',
        loadChildren: () =>
          import('./Back/bloc/bloc.module').then((m) => m.BlocModule),
      },

      {
        path: 'evenement',
        loadChildren: () =>
          import('./Back/evenement/evenement.module').then((m) => m.EvenementModule),

      },     
        {
        path: 'university',
        loadChildren: () =>
          import('./Back/university/university.module').then((c) => c.UniversityModule),


      },
      {
        path: 'foyer',
        loadChildren: () =>
          import('./Back/foyer/foyer.module').then((f) => f.FoyerModule),
      },
      {
        path: 'participation',
        loadChildren: () =>
          import('./Back/participation/participation.module').then((m) => m.ParticipationModule),

      },
    ],
  },
  { path: 'home', component: FrontOfficeComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    children: [

      {
        path: 'login',
        loadChildren: () =>
          import('./front/user-front/user-front.module').then((m) => m.UserFrontModule),
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [

      {
        path: 'register',
        loadChildren: () =>
          import('./front/user-front/user-front.module').then((m) => m.UserFrontModule),
      },
    ],
  },
  {path:'accessdenied', component:AccessdeniedComponent},
  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
