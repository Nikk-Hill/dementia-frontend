export enum RoleType {
  'CUSTOMER',
  'MANAGER'
}

export interface UserDetails {
  name: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  role: RoleType
}

export interface SignUpResponse {
  wasSignUpSuccessful: boolean;
  exceptionDetails: string;
}

export interface SignInResponse {
  wasSignInSuccessful: boolean;
  userName: string;
  userEmailId: string;
  jwtToken: string;
  role : RoleType;
}

export interface BookingRequest {
  restaurantId : number;
  bookingDate: string;
  numberOfPeople: number;
  timeSlot: string;
}

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  registrationDate: Date;
  cuisines: string[];
  location: string;
  timeSlots: string[];
}

export enum BookingStatus {
  CONFIRMED='CONFIRMED',
  REJECTED='REJECTED',
  PENDING='PENDING',
  CANCELLED='CANCELLED'
}

export interface UserBooking {
  bookingId: number;
  restaurantName: string;
  creationDate: Date;
  bookingDate: Date;
  numberOfPeople: number;
  timeSlot: string;
  daysRemainingTillBooking: number;
  bookingStatus: string;
}

export enum ActionStatus {
  'NOT_STARTED',
  'PENDING',
  'COMPLETED',
  'FAILED'
}
