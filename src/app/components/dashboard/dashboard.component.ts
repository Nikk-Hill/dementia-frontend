import { Component, OnInit, isStandalone } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorComponent } from "../doctor/doctor.component";
import { MyBookingsComponent } from "../my-bookings/my-bookings.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { JwtTokenService } from '../../services/jwt-token.service';
import { Store } from '@ngrx/store';
import { getAllBookingsStartedAction } from '../../store/actions/user-booking.actions';
import { getAllExpertsStartedAction } from '../../store/actions/expert.actions';
import { getCommunityStartedAction } from '../../store/actions/community.actions';
import { CommunityComponent } from '../community/community.component';
import { getAllNursesStartedAction } from '../../store/actions/nurse.actions';
import { NurseComponent } from '../nurse/nurse.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
      CommonModule,
      DoctorComponent, 
      MyBookingsComponent,
      FontAwesomeModule,
      CommunityComponent,
      NurseComponent
    ]
})
export class DashboardComponent {

  isDoctorActive: boolean = false;
  isNurseActive: boolean = false;
  isMyBookingsActive: boolean = false;
  isCommunityActive: boolean = false;
  signOutIcon = faSignOut;

  constructor(private router: Router, 
    private jwtTokenService: JwtTokenService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard','doctor']);
    this.isDoctorActive= true;
  }

  navigateToDoctor(): void {
    this.isDoctorActive=true;
    this.isNurseActive=false;
    this.isMyBookingsActive=false;
    this.isCommunityActive=false;
    this.store.dispatch(getAllExpertsStartedAction());
    this.router.navigate(['dashboard','doctor']);
  }

  navigateToNurses(): void {
    this.isNurseActive=true;
    this.isDoctorActive=false;
    this.isMyBookingsActive=false;
    this.isCommunityActive=false;
    this.store.dispatch(getAllNursesStartedAction());
    this.router.navigate(['dashboard','nurse']);
  }

  navigateToMyBookings(): void {
    this.isMyBookingsActive=true;
    this.isDoctorActive=false;
    this.isNurseActive=false;
    this.isCommunityActive=false;
    this.store.dispatch(getAllBookingsStartedAction());
    this.router.navigate(['dashboard','my-bookings']);
  }

  navigateToCommunity(): void {
    this.isDoctorActive=false;
    this.isMyBookingsActive=false;
    this.isNurseActive=false;
    this.isCommunityActive=true;
    this.router.navigate(['dashboard','community']);
  }

  signOut() {
    alert('Signing you out');
    this.jwtTokenService.clearToken();
    this.router.navigate(['sign-in']);
  }

}
