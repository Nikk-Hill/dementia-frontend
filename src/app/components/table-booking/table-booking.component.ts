import { Component, Input } from '@angular/core';
import { BookingRequest, Restaurant } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { bookingRequestInitiatedAction } from '../../store/actions/booking-request.actions';

@Component({
  selector: 'app-table-booking',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './table-booking.component.html',
  styleUrl: './table-booking.component.scss'
})

export class TableBookingComponent {
  @Input() restaurant: Restaurant = {} as Restaurant;
  date: string = '';
  numberOfPeople: number = 0;
  timeSlot: string = '';
  // booking: BookingRequest = { date: '', numberOfPeople: 0, timeSlot: '' };
  timeSlots: string[] = [];
  minDate = new Date().toISOString().slice(0, 10); // Today's date
  maxDate: string = this.calculateDateTwoMonthsFromNow();
  restaurantName = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    if(this.restaurant != undefined && this.restaurant != null) {
      console.log("REstaurant is " + this.restaurant.restaurantId);
      this.restaurantName = this.restaurant.restaurantName;
      this.timeSlots = this.restaurant.timeSlots;
    }
   }

  calculateDateTwoMonthsFromNow() {
    const today = new Date();
    const twoMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    return twoMonthsFromNow.toISOString().slice(0, 10);
  }

  onSubmit() {
    const bookingRequest: BookingRequest = {
        bookingDate: this.date,
        numberOfPeople: this.numberOfPeople,
        timeSlot: this.timeSlot,
        restaurantId: this.restaurant.restaurantId
    };
    console.log(bookingRequest.bookingDate);
    this.store.dispatch(bookingRequestInitiatedAction({ bookingRequest }));
  }
}
