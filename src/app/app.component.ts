import { Component, inject } from '@angular/core';
import { LoadingStateService } from './core/interceptors/loading.service';

@Component({
  selector: 'app-root',
  template: ` <div>
    <app-top-bar></app-top-bar>
    <mat-spinner class="spinner" *ngIf="loading$ | async"></mat-spinner>
    <router-outlet></router-outlet>
    <app-footbar></app-footbar>
  </div>`,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  private loadingService = inject(LoadingStateService);
  loading$ = this.loadingService.loading$;
}
