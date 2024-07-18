import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoleType, UserDetails } from '../../models/app-models.model';
import { Store } from '@ngrx/store';
import { signUpInitiatedAction } from '../../store/actions/sign-up.actions';
import { selectSignUpResponse } from '../../store/selectors/sign-up.selector';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  readonly signUpResponse$ = this.store.select(selectSignUpResponse);
  name: string = '';
  emailId: string = '';
  password: string = '';
  phoneNumber: string = '';
  role: string = 'CUSTOMER';
  isSubmitEnabled: boolean = false;

  ngOnInit(): void {
    this.signUpResponse$.subscribe(signUpResponse => {
      if(signUpResponse?.wasSignUpSuccessful == true) {
        console.log("Sign Up was Successful");
        this.switchToSignIn();
      } else if(signUpResponse?.wasSignUpSuccessful == false) {
        alert("Sign-up failed : " + signUpResponse.exceptionDetails);
      }
    })
  }

  onSubmit() {
    const userDetails: UserDetails = {
      name: this.name,
      emailId: this.emailId,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role: this.role as unknown as RoleType,
    };
    console.log(userDetails);
    this.store.dispatch(signUpInitiatedAction({ userDetails }));
  }

  onChange() {
    if(this.name != '' && this.emailId != '' && this.password != '' && this.phoneNumber != '' && this.role != '') {
      this.isSubmitEnabled = true;
    }
  }

  switchToSignIn() {
    this.name = '';
    this.emailId = '';
    this.password = '';
    this.phoneNumber = '';
    this.role = 'CUSTOMER';
    this.isSubmitEnabled = false;
    this.router.navigate(['/sign-in']);
  }

  constructor(private router: Router, private store: Store) {}
  

}
