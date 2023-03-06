import { Component, inject } from '@angular/core';
import { LoadingStateService } from './core/interceptors/loading.service';

@Component({
  selector: 'app-root',
  template: ` <app-top-bar></app-top-bar>
    <ng-container class="spinner-overlay" *ngIf="loading$ | async"
      ><mat-spinner></mat-spinner
    ></ng-container>
    <router-outlet></router-outlet>
    <app-footbar></app-footbar>`,
})
export class AppComponent {
  private loadingService = inject(LoadingStateService);
  loading$ = this.loadingService.loading$;
}
