export enum RoleType {
  'DOCTOR',
  'NURSE'
}

export interface UserDetails {
  name: string;
  emailId: string;
  password: string;
  phoneNumber: string;
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
}

export interface BookingRequest {
  expertId : number;
  bookingDate: string;
  timeSlot: string;
}

export interface Expert {
  expertId: number;
  expertName: string;
  location: string;
  role: RoleType
}

export enum BookingStatus {
  CONFIRMED='CONFIRMED',
  REJECTED='REJECTED',
  PENDING='PENDING',
  CANCELLED='CANCELLED'
}

export interface UserBooking {
  bookingId: number;
  expertName: string;
  creationDate: Date;
  bookingDate: Date;
  timeSlot: string;
  daysRemainingTillBooking: number;
}

export enum ActionStatus {
  'NOT_STARTED',
  'PENDING',
  'COMPLETED',
  'FAILED'
}
