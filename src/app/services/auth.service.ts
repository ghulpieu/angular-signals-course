import { computed, effect, inject, Service, signal } from '@angular/core';
import { IUser } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const USER_STORAGE_KEY = 'user';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  #userSignal = signal<IUser | null>(null);

  public user = this.#userSignal.asReadonly();

  public isLoggedIn = computed(() => !!this.user());

  constructor() {
    this.loadUserFromStorage();

    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  private loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  public async login(email: string, password: string): Promise<IUser> {
    const login$ = this.http.post<IUser>(`${environment.apiRoot}/login`, {
      email,
      password,
    });

    const user = await firstValueFrom(login$);

    this.#userSignal.set(user);
    return user;
  }

  public async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login');
  }
}
