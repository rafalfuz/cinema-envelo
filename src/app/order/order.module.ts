import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderFormComponent } from './views/order-form/order-form.component';
import { OrderComponent } from './order.component';
import { ReservationComponent } from './views/reservation/reservation.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
        children: [
          {
            path: ':id/:day/:time/:roomId',
            component: ReservationComponent,
          },
        ],
      },
      {
        path: 'order',
        component: OrderFormComponent,
      },
    ]),
  ],
})
export default class OrderModule {}
