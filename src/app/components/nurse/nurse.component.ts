import { Component, OnInit } from '@angular/core';
import { ActionStatus, Expert } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SlotBookingComponent } from '../slot-booking/slot-booking.component';
import { selectBookingRequestStatus, selectBookingRequestState } from '../../store/selectors/booking-request.selector';
import { selectNurses } from '../../store/selectors/nurse.selector';

@Component({
  selector: 'app-nurse',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CommonModule,
    SlotBookingComponent
  ],
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.scss']
})
export class NurseComponent implements OnInit {
  readonly nurses$ = this.store.select(selectNurses);
  readonly bookingRequestStatus$ = this.store.select(selectBookingRequestStatus);
  chosenNurse: Expert = {} as Expert;
  nurses: Expert[] = [];
  filteredNurses: Expert[] = [];
  searchText: string = '';
  searchLocation: string = '';
  bookASlot: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.nurses$.subscribe(nurses => {
      console.log(nurses);
        this.nurses = nurses;
        this.filteredNurses = this.nurses;
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
        this.chosenNurse = {} as Expert;
      }
    })

  }

  filterNurses(): void {
    this.filteredNurses = this.nurses.filter(restaurant => 
      restaurant.expertName.toLowerCase().includes(this.searchText.toLowerCase()) &&
      restaurant.location.toLowerCase().includes(this.searchLocation.toLowerCase())
    );
  }

  bookSlot(expert: Expert): void {
    this.bookASlot = true;
    this.chosenNurse = expert;
  }

  closeModal() {
    this.bookASlot = false;
    this.chosenNurse = {} as Expert;
  }
  
}
