import { Routes } from '@angular/router';
import { SlotBookingComponent } from './components/slot-booking/slot-booking.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MedicationReminderComponent } from './medication-reminder/medication-reminder.component';
import { CommunityComponent } from './components/community/community.component';
import { NurseComponent } from './components/nurse/nurse.component';

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
        redirectTo: 'doctor',
        pathMatch: 'full'
      },
      {
        path: 'doctor',
        component: DoctorComponent,
        children: [
          {
            path: 'slot-booking',
            canActivate: [AuthGuard],
            component: SlotBookingComponent
          }
        ]
      },
      {
        path: 'nurse',
        component: NurseComponent,
        children: [
          {
            path: 'slot-booking',
            canActivate: [AuthGuard],
            component: SlotBookingComponent
          }
        ]
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      },
      {
        path: 'medicine-reminder',
        component: MedicationReminderComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'community',
        component: CommunityComponent
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
