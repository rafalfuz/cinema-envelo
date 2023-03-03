import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  router = inject(Router);
  user = inject(AuthService).auth$;
  authValue = inject(AuthService).confirm$;
  authStateService = inject(AuthService);
  durationInSeconds = 5;

  reloadHomeView() {
    // const x = setTimeout(() => {
    //   window.location.reload();
    // }, 1);
    // return x;
  }
}
