import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environemnt } from "../environment";
import { UserDetails, SignUpResponse } from "../models/app-models.model";

const { apiUrl } = environemnt;

@Injectable()
export class SignUpService {
  constructor( private http: HttpClient) { }

  signUserUp(userDetails: UserDetails): Observable<SignUpResponse> {
    console.log('Service called for sign-up');
    const url = `${apiUrl}/sign-up`;
    return this.http.post<SignUpResponse>(url, userDetails);
  }
}