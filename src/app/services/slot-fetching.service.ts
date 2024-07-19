import { Observable } from "rxjs";
import { BookingRequest as FetchingRequest } from "../models/app-models.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environemnt } from "../environment";
import { HttpHeaderUtil } from "../util/http-header-util.service";

const { apiUrl } = environemnt;

@Injectable()
export class SlotFetchingService {
  constructor( private http: HttpClient, 
    private httpHeaderUtil: HttpHeaderUtil
  ) { }

  fetchSlots(expertId: number, date: string): Observable<string[]> {
    console.log('Service called for creating booking');
    const url = `${apiUrl}/expert-time-slots`;
    let params = new HttpParams()
    .set('expertId', expertId)
    .set('date', date);
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    return this.http.get<string[]>(url, { params , headers: requestHeaders });
  }
}