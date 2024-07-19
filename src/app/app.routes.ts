import { Routes } from '@angular/router';
import { TableBookingComponent } from './components/table-booking/table-booking.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full'
      },
      {
        path: 'restaurants',
        component: RestaurantComponent,
        children: [
          {
            path: 'table-booking',
            canActivate: [AuthGuard],
            component: TableBookingComponent
          }
        ]
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/sign-in'
  }
];
