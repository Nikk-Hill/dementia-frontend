import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleType, SignInResponse, UserDetails } from '../../models/app-models.model';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { signInInitiatedAction } from '../../store/actions/sign-in.actions';
import { SignInService } from '../../services/sign-in.service';
import { EffectsModule } from '@ngrx/effects';
import { signInReducer } from '../../store/reducers/sign-in';
import { selectSignInResponse } from '../../store/selectors/sign-in.selectors';
import { CommonModule } from '@angular/common';
import { JwtTokenService } from '../../services/jwt-token.service';
import { getAllRestaurantsStartedAction } from '../../store/actions/restaurant.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

export class SignInComponent implements OnInit {
  readonly signInResponse$ = this.store.select(selectSignInResponse);
  emailId: string = '';
  password: string = '';
  role: string = 'CUSTOMER';
  isSubmitEnabled: boolean = false;

  ngOnInit(): void {
    this.signInResponse$.subscribe(signInResponse => {
      if(signInResponse?.wasSignInSuccessful == true) {
        this.signInWasSuccessful(signInResponse);
      } else if(signInResponse?.wasSignInSuccessful == false) {
        alert("Sign-In failed : Please enter correct details");
      }
    })
  }

  onChange() {
    if(this.emailId != '' && this.password != '' && this.role != null) {
      this.isSubmitEnabled = true;
    }
  }

  signInWasSuccessful(signInResponse: SignInResponse) {
    console.log("Sign In successful for " + signInResponse.userEmailId);
    this.jwtTokenService.storeJwtTokenToLocalStorage(signInResponse.jwtToken);
    this.router.navigate(['dashboard']);
    this.store.dispatch(getAllRestaurantsStartedAction());
  }

  onSubmit() {
    const userDetails: UserDetails = {
      emailId: this.emailId,
      password: this.password,
      role: this.role as unknown as RoleType,
      phoneNumber: '',
      name: ''
    };
    this.store.dispatch(signInInitiatedAction({userDetails}));
  }

  switchToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  constructor(
    private router: Router, 
    private store: Store, 
    private jwtTokenService: JwtTokenService
  ) {}

}
