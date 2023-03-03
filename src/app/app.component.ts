import { createInjectableType } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingStateService } from './core/interceptors/loading.service';

@Component({
  selector: 'app-root',
  template: ` <app-top-bar></app-top-bar>
    <mat-spinner *ngIf="loading$ | async"></mat-spinner>
    <router-outlet></router-outlet>
    <app-footbar></app-footbar>`,
})
export class AppComponent {
  private loadingService = inject(LoadingStateService);

  loading$ = this.loadingService.loading$;
}
