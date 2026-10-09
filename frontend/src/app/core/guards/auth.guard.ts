import { Injectable } from '@angular/core';

import {
  CanActivate,
  CanActivateChild,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard
implements CanActivate, CanActivateChild {

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  canActivate(): boolean {

    if (this.authService.isLoggedIn()) {

      return true;

    }

    this.router.navigate([

      '/auth/login'

    ]);

    return false;

  }

  canActivateChild(): boolean {

    return this.canActivate();

  }

}