import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfMoviesComponent } from './movies/repertoure/list-of-movies.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminViewComponent } from './admin/admin-view.component';
import { WatchListComponent } from './movies/watch-list/watch-list.component';
import { AdminGuard } from './auth/admin-auth.guards';

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
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'form',
    component: OrderFormComponent,
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
