import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, OnDestroy {
  timeServices: any;

  constructor(private auths: AuthServiceService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.auths.userIsAuthenticated) {
    //   this.router.navigate(['/auth']);
    // }
    // return true;
    return this.auths.userIsAuthenticated;
  }

  // ONLY USE ME FOR TESTING
  reloginFortestOnly(): void {
    this.timeServices = setTimeout(() => {
      this.auths.login().then(login => {
        return true;
      });
    }, 500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeServices);
  }
}
