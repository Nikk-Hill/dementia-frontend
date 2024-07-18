import { Component, OnInit, isStandalone } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantComponent } from "../restaurant/restaurant.component";
import { MyBookingsComponent } from "../my-bookings/my-bookings.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { JwtTokenService } from '../../services/jwt-token.service';
import { Store } from '@ngrx/store';
import { getAllBookingsStartedAction } from '../../store/actions/user-booking.actions';
import { getAllRestaurantsStartedAction } from '../../store/actions/restaurant.actions';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
      CommonModule,
      RestaurantComponent, 
      MyBookingsComponent,
      FontAwesomeModule
    ]
})
export class DashboardComponent {

  isRestaurantActive: boolean = false;
  isMyBookingsActive: boolean = false;
  signOutIcon = faSignOut;

  constructor(private router: Router, 
    private jwtTokenService: JwtTokenService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard','restaurants']);
    this.isRestaurantActive= true;
  }

  navigateToRestaurant(): void {
    this.isRestaurantActive=true;
    this.isMyBookingsActive=false;
    this.store.dispatch(getAllRestaurantsStartedAction());
    this.router.navigate(['dashboard','restaurants']);
  }

  navigateToMyBookings(): void {
    this.isMyBookingsActive=true;
    this.isRestaurantActive=false;
    this.store.dispatch(getAllBookingsStartedAction());
    this.router.navigate(['dashboard','my-bookings']);
  }

  signOut() {
    alert('Signing you out');
    this.jwtTokenService.clearToken();
    this.router.navigate(['sign-in']);
  }

}
