import { Injectable } from "@angular/core";
import { environemnt } from "../environment";
import { HttpClient } from "@angular/common/http";
import { RoleType, SignInResponse, UserDetails } from "../models/app-models.model";
import { Observable, of } from "rxjs";

const { apiUrl } = environemnt;

@Injectable()
export class SignInService {
  constructor( private http: HttpClient) { }

  signUserIn(userDetails: UserDetails): Observable<SignInResponse> {
    console.log('Service called for sign-in');
    const url = `${apiUrl}/sign-in`;
    return this.http.post<SignInResponse>(url, userDetails);
  }
}