import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserBooking } from "../models/app-models.model";
import { environemnt } from "../environment";
import { Observable, tap } from "rxjs";
import { HttpHeaderUtil } from "../util/http-header-util.service";

const { apiUrl } = environemnt;

@Injectable()
export class UserBookingsService {
  constructor( private http: HttpClient, 
    private httpHeaderUtil: HttpHeaderUtil
  ) { }

  getAllBookings(): Observable<UserBooking[]> {
    console.log('Service called for fetching all user bookings');
    const url = `${apiUrl}/booking/all`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    console.log(requestHeaders.get('Authorization'));
    return this.http.get<UserBooking[]>(url, { headers: requestHeaders })
    .pipe(
      tap(response => {
        console.log('Response from server:', response); 
    }));
  }

  cancelBooking(bookingId: number): Observable<String> {
    console.log('Service called for cancelling booking : ' + bookingId);
    const url = `${apiUrl}/booking/cancel?bookingId=${bookingId}`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    console.log(url);
    return this.http.get<String>(url, { headers: requestHeaders });
  }
}