import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Restaurant, UserBooking } from "../models/app-models.model";
import { HttpHeaderUtil } from "../util/http-header-util.service";
import { environemnt } from "../environment";

const { apiUrl } = environemnt;

@Injectable()
export class RestaurantService {
  constructor( private http: HttpClient, 
    private httpHeaderUtil: HttpHeaderUtil
  ) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    console.log('Service called for fetching all restaurants');
    const url = `${apiUrl}/restaurant/all`;
    const requestHeaders = this.httpHeaderUtil.getHeadersWithBearerToken();
    return this.http.get<Restaurant[]>(url, { headers: requestHeaders });
  }

}