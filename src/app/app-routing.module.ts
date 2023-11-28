import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from './Back/backoff/backoff.component';
import { Error404Component } from './error404/error404.component';
import { FrontOfficeComponent } from './front/front-office/front-office.component';
import { DashboardComponent } from './Back/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: BackoffComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to 'dashboard' by default
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'chambre',
        loadChildren: () =>
          import('./Back/chambre/chambre.module').then((m) => m.ChambreModule),
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
    ],
  },
  { path: 'home', component: FrontOfficeComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
