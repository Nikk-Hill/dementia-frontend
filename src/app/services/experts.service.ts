import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Expert, UserBooking } from "../models/app-models.model";
import { HttpHeaderUtil } from "../util/http-header-util.service";
import { environemnt } from "../environment";

const { apiUrl } = environemnt;

@Injectable()
export class ExpertService {
  constructor( private http: HttpClient, 
    private httpHeaderUtil: HttpHeaderUtil
  ) { }

  getAllDoctors(): Observable<Expert[]> {
    console.log('Service called for fetching all Doctors');
    const url = `${apiUrl}/expert/all-doctors`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    return this.http.get<Expert[]>(url, { headers: requestHeaders });
  }

  getAllNurses(): Observable<Expert[]> {
    console.log('Service called for fetching all nurses');
    const url = `${apiUrl}/expert/all-nurses`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    return this.http.get<Expert[]>(url, { headers: requestHeaders });
  }

}