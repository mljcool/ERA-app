import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  constructor() { }

  login(): Promise<boolean> {
    this._userIsAuthenticated = true;
    return Promise.resolve(this._userIsAuthenticated);
  }

  logout() {
    this._userIsAuthenticated = false;
  }

}
