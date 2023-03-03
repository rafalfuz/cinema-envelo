import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.auth$.pipe(
    map((user) => user.role === 'admin' && authService.getConfirm().hasAuth),
    map((isAdmin) => {
      if (!isAdmin) {
        authService.handleNoAuthState;
      }
      return isAdmin;
    })
  );
};
