import { Injectable } from "@angular/core";
import { JwtTokenService } from "../services/jwt-token.service";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class HttpHeaderUtil {

  constructor(private JwtTokenService: JwtTokenService) { }

  getHeadersWithBearerToken() : HttpHeaders {
    const token = this.JwtTokenService.getJwtToken();

    if(token != '') {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }
  
}