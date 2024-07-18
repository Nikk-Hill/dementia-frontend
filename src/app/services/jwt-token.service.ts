import { Injectable } from "@angular/core";

@Injectable()
export class JwtTokenService {
  private tokenKey = 'jwtToken';

  storeJwtTokenToLocalStorage(jwtToken: string) : void {
    console.log("Saving token to localStorage : " + jwtToken);
    localStorage.setItem(this.tokenKey, jwtToken);
  }

  getJwtToken() : string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  constructor() {}

}