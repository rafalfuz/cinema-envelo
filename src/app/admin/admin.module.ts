import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminViewComponent } from './admin-view.component';
import { AdminEffects } from './store/admin.effects';
import { MovieReducer } from './store/admin.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('penetratorWStringu', MovieReducer),
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AdminViewComponent,
      },
    ]),
  ],
})
export default class OrderModule {}
