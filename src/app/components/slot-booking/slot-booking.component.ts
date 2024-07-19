import { Component, Input } from '@angular/core';
import { BookingRequest, Expert } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { bookingRequestInitiatedAction } from '../../store/actions/booking-request.actions';
import { getAllFreeSlotsStartedAction } from '../../store/actions/slot-fetching.actions';
import { selectSlots } from '../../store/selectors/slot-fetching.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slot-booking',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './slot-booking.component.html',
  styleUrl: './slot-booking.component.scss'
})

export class SlotBookingComponent {
  @Input() expert: Expert = {} as Expert;
  readonly slots$ = this.store.select(selectSlots);
  date: string = '';
  timeSlot: string = '';
  timeSlots: string[] = [];
  minDate = new Date().toISOString().slice(0, 10); // Today's date
  maxDate: string = this.calculateDateTwoMonthsFromNow();
  expertName = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    if(this.expert != undefined && this.expert != null) {
      console.log("Expert is " + this.expert.expertId);
      this.expertName = this.expert.expertName;
    }

    this.slots$.subscribe(slots => {
      if(slots.length > 0) {
        this.timeSlots = slots;
      }
    })
   }

  calculateDateTwoMonthsFromNow() {
    const today = new Date();
    const twoMonthsFromNow = new Date(today.getFullYear(), today.getMonth()+2, 0);
    return twoMonthsFromNow.toISOString().slice(0, 10);
  }

  onSubmit() {
    const bookingRequest: BookingRequest = {
        bookingDate: this.date,
        timeSlot: this.timeSlot,
        expertId: this.expert.expertId
    };
    console.log(bookingRequest.bookingDate);
    this.store.dispatch(bookingRequestInitiatedAction({ bookingRequest }));
  }

  fetchSlots() {
    console.log('Fetching slots');
    let expertId = this.expert.expertId;
    let date = this.date;
    this.store.dispatch(getAllFreeSlotsStartedAction({ expertId, date}));
  }
}
