import { Injectable } from '@angular/core';

import {
  CanActivate,
  CanActivateChild,
  Router
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResidentGuard
implements CanActivate, CanActivateChild {

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  canActivate(): Observable<boolean> {

    return this.authService.getCurrentUser().pipe(

      map((response) => {

        if (response.user.role === 'resident') {

          return true;

        }

        this.router.navigate([
          '/auth/login'
        ]);

        return false;

      }),

      catchError(() => {

        this.router.navigate([
          '/auth/login'
        ]);

        return of(false);

      })

    );

  }

  canActivateChild(): Observable<boolean> {

    return this.canActivate();

  }

}