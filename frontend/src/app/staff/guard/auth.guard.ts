import { CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isLoggedIn() && this.authService.getRole() === 'staff') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};