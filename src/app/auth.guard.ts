import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtTokenService } from './services/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtTokenService : JwtTokenService) {}

  canActivate(): boolean {

    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.jwtTokenService.getJwtToken() != '' ? true : false;
  }
}
