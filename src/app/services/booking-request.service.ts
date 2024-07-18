import { Observable } from "rxjs";
import { BookingRequest } from "../models/app-models.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environemnt } from "../environment";
import { HttpHeaderUtil } from "../util/http-header-util.service";

const { apiUrl } = environemnt;

@Injectable()
export class BookingRequestService {
  constructor( private http: HttpClient, 
    private httpHeaderUtil: HttpHeaderUtil
  ) { }

  createBooking(bookingRequest: BookingRequest): Observable<void> {
    console.log('Service called for creating booking');
    const url = `${apiUrl}/booking-request/create`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    return this.http.post<void>(url, bookingRequest, { headers: requestHeaders });
  }
}