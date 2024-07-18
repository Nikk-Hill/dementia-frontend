import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { signInReducer } from './store/reducers/sign-in';
import { SignInEffects } from './store/effects/sign-in.effects';
import { EffectsModule } from '@ngrx/effects';
import { SignInService } from './services/sign-in.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';
import { SignUpEffects } from './store/effects/sign-up.effects';
import { signUpReducer } from './store/reducers/sign-up';
import { SignUpService } from './services/sign-up.service';
import { JwtTokenService } from './services/jwt-token.service';
import { UserBookingsService } from './services/user-bookings.service';
import { HttpHeaderUtil } from './util/http-header-util.service';
import { UserBookingEffects } from './store/effects/user-booking.effects';
import { userBookingReducer } from './store/reducers/user-booking';
import { RestaurantService } from './services/restaurants.service';
import { restaurantReducer } from './store/reducers/restaurant';
import { RestaurantEffects } from './store/effects/restaurant.effects';
import { BookingRequestService } from './services/booking-request.service';
import { bookingRequestReducer } from './store/reducers/booking-request';
import { BookingRequestEffects } from './store/effects/booking-request.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    //Provide all the services here
    SignInService,
    SignUpService,
    JwtTokenService,
    UserBookingsService,
    RestaurantService,
    BookingRequestService,
    HttpHeaderUtil,
    HttpClient,
    provideHttpClient(),
    importProvidersFrom(
      StoreModule.forRoot({
        'sign-in': signInReducer,
        'sign-up': signUpReducer,
        'user-booking': userBookingReducer,
        'restaurants': restaurantReducer,
        'booking-request': bookingRequestReducer
      }),
      EffectsModule.forRoot([
        SignInEffects,
        SignUpEffects,
        UserBookingEffects,
        RestaurantEffects,
        BookingRequestEffects
      ]),
    )
  ]
};
