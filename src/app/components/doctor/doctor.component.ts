import { Component, OnInit } from '@angular/core';
import { ActionStatus, Expert } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectExperts, selectExpertState } from '../../store/selectors/expert.selector';
import { Router } from '@angular/router';
import { SlotBookingComponent } from '../slot-booking/slot-booking.component';
import { selectBookingRequestStatus, selectBookingRequestState } from '../../store/selectors/booking-request.selector';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CommonModule,
    SlotBookingComponent
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  readonly doctors$ = this.store.select(selectExperts);
  readonly bookingRequestStatus$ = this.store.select(selectBookingRequestStatus);
  chosenExpert: Expert = {} as Expert;
  experts: Expert[] = [];
  filteredExperts: Expert[] = [];
  searchText: string = '';
  searchLocation: string = '';
  bookASlot: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.doctors$.subscribe(experts => {
      console.log(experts);
        this.experts = experts;
        this.filteredExperts = this.experts;
        /**this.restaurants = [
          { restaurantId: 1, restaurantName: 'Italian Bistro', registrationDate: new Date('2020-01-01'), cuisines: ['Italian'], location: 'New York', timeSlots: ['12-13','13-14','15-16'] },
          { restaurantId: 2, restaurantName: 'Sushi Place', registrationDate: new Date('2019-05-20'), cuisines: ['Japanese'], location: 'Los Angeles', timeSlots: ['12-13','13-14','15-16']  },
          { restaurantId: 3, restaurantName: 'Burger Joint', registrationDate: new Date('2021-03-15'), cuisines: ['American'], location: 'Chicago',  timeSlots: ['12-13','13-14','15-16']  
          },
        ];
        this.filteredRestaurants = this.restaurants;**/
    })

    this.bookingRequestStatus$.subscribe(requestStatus => {
      if(requestStatus == ActionStatus.COMPLETED) {
        // alert('Booking was successful');
        this.bookASlot = false;
        this.chosenExpert = {} as Expert;
      }
    })

  }

  filterExperts(): void {
    this.filteredExperts = this.experts.filter(restaurant => 
      restaurant.expertName.toLowerCase().includes(this.searchText.toLowerCase()) &&
      restaurant.location.toLowerCase().includes(this.searchLocation.toLowerCase())
    );
  }

  bookSlot(expert: Expert): void {
    this.bookASlot = true;
    this.chosenExpert = expert;
  }

  closeModal() {
    this.bookASlot = false;
    this.chosenExpert = {} as Expert;
  }
  
}
