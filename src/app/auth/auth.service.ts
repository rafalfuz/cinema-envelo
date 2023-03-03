import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, MonoTypeOperatorFunction } from 'rxjs';
import { User } from 'models';
import { ToastrService } from 'ngx-toastr';

export type LoginCredentials = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toast = inject(ToastrService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiurl = 'http://localhost:3000/user';
  private user$$ = new BehaviorSubject<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  });
  private confirm$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.user$$.asObservable();
  }

  get confirm$() {
    return this.confirm$$.asObservable();
  }

  get selectUserId$() {
    return this.user$$.pipe(map((user) => user.id));
  }

  getUserDataById(id: string) {
    return this.http.get(this.apiurl + '/' + id);
  }

  getConfirm(): { hasAuth: boolean } {
    return this.confirm$$.getValue();
  }

  login(user: User) {
    this.confirm$$.next({ hasAuth: true });
    this.user$$.next(user);
    this.router.navigate(['']);
  }

  autoLogin() {
    console.log('AutoLoggin works!');
    if (localStorage.getItem('userId')) {
      this.confirm$$.next({ hasAuth: true });
      this.user$$.next({
        ...this.user$$.value,
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole'),
      });
    }
  }

  logout() {
    localStorage.clear();

    this.confirm$$.next({ hasAuth: false });
    this.user$$.next({
      id: '',
      name: '',
      email: '',
      password: '',
      role: 'none',
    });
    this.router.navigate(['/']);
    this.toast.success('Zostałes poprawnie wylogowany');
  }

  handleNoAuthState() {
    this.router.navigate(['/noAccess']);
  }
}
