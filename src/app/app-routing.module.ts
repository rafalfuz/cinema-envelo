import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfMoviesComponent } from './movies/repertoure/list-of-movies.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { OrderFormComponent } from './order/views/order-form/order-form.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AdminViewComponent } from './admin/admin-view.component';
import { WatchListComponent } from './movies/watch-list/watch-list.component';
import { AdminGuard } from './auth/admin-auth.guard';
import { NoAccessViewComponent } from './core/no-access-view/no-access.view-component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },

  {
    path: 'watch-list',
    component: WatchListComponent,
  },
  {
    path: 'no-access',
    component: NoAccessViewComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module'),
    canActivate: [AdminGuard],
  },
  {
    path: 'reservation',
    loadChildren: () => import('./order/order.module'),
  },
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/06-12-2022' },
      { path: ':date', component: ListOfMoviesComponent },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
