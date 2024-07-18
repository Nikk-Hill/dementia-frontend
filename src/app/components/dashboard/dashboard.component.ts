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
import { getCommunityStartedAction } from '../../store/actions/community.actions';
import { CommunityComponent } from '../community/community.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
      CommonModule,
      RestaurantComponent, 
      MyBookingsComponent,
      FontAwesomeModule,
      CommunityComponent
    ]
})
export class DashboardComponent {

  isRestaurantActive: boolean = false;
  isMyBookingsActive: boolean = false;
  isCommunityActive: boolean = false;
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
    this.isCommunityActive=false;
    this.store.dispatch(getAllRestaurantsStartedAction());
    this.router.navigate(['dashboard','restaurants']);
  }

  navigateToMyBookings(): void {
    this.isMyBookingsActive=true;
    this.isRestaurantActive=false;
    this.isCommunityActive=false;
    this.store.dispatch(getAllBookingsStartedAction());
    this.router.navigate(['dashboard','my-bookings']);
  }

  navigateToCommunity(): void {
    this.isRestaurantActive=false;
    this.isMyBookingsActive=false;
    this.isCommunityActive=true;
    this.router.navigate(['dashboard','community']);
  }

  signOut() {
    alert('Signing you out');
    this.jwtTokenService.clearToken();
    this.router.navigate(['sign-in']);
  }

}
