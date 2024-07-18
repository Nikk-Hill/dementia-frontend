import { Component, OnInit } from '@angular/core';
import { ActionStatus, Restaurant } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectRestaurants, selectRestaurantState } from '../../store/selectors/restaurant.selector';
import { Router } from '@angular/router';
import { TableBookingComponent } from '../table-booking/table-booking.component';
import { selectBookingRequestStatus, selectBookingRequestState } from '../../store/selectors/booking-request.selector';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CommonModule,
    TableBookingComponent
  ],
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  readonly restaurants$ = this.store.select(selectRestaurants);
  readonly bookingRequestStatus$ = this.store.select(selectBookingRequestStatus);
  chosenRestaurant: Restaurant = {} as Restaurant;
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchText: string = '';
  searchLocation: string = '';
  bookATable: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.restaurants$.subscribe(restaurants => {
      console.log(restaurants);
        this.restaurants = restaurants;
        this.filteredRestaurants = this.restaurants;
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
        this.bookATable = false;
        this.chosenRestaurant = {} as Restaurant;
      }
    })

  }

  filterRestaurants(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant => 
      restaurant.restaurantName.toLowerCase().includes(this.searchText.toLowerCase()) &&
      restaurant.location.toLowerCase().includes(this.searchLocation.toLowerCase())
    );
  }

  bookTable(restaurant: Restaurant): void {
    this.bookATable = true;
    this.chosenRestaurant = restaurant;
  }

  closeModal() {
    this.bookATable = false;
    this.chosenRestaurant = {} as Restaurant;
  }
  
}
