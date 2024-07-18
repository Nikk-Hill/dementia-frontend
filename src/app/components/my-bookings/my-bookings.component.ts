import { Component, OnInit } from '@angular/core';
import { BookingStatus, UserBooking } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserBookingsService } from '../../services/user-bookings.service';
import { Store } from '@ngrx/store';
import { selectUserBookings } from '../../store/selectors/user-booking.selector';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})

export class MyBookingsComponent implements OnInit {
  readonly userBookings$ = this.store.select(selectUserBookings);
  bookings: UserBooking[] = [];
  paginatedBookings: UserBooking[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 2;
  totalPages: number = 0;

  ngOnInit(): void {
    this.userBookings$.subscribe(userBookings => {
      if(userBookings != undefined && userBookings.length > 0) {
        this.bookings = userBookings;
        console.log(this.bookings);
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
        this.updatePaginatedBookings();
      }
    })
    
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'confirmed';
      case 'REJECTED': return 'rejected';
      case 'PENDING': return 'pending';
      case 'CANCELLED': return 'cancelled';
      default: return '';
    }
  }

  cancelBooking(booking: UserBooking): void {
    console.log("Booking cancelled");
    this.userBookingService.cancelBooking(booking.bookingId);
  }

  updatePaginatedBookings(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBookings = this.bookings.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBookings();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBookings();
    }
  }

  constructor(private userBookingService: UserBookingsService, private store: Store) { }

}