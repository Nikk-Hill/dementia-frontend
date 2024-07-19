import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private schedulerStarted = false;

  constructor() {}

  startScheduler() {
    if (!this.schedulerStarted) {
      setInterval(() => {
        this.checkTime();
      }, 60000); // Check every minute
      this.schedulerStarted = true;
    }
  }

  checkTime() {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const formattedTime = `${this.pad(currentHours)}:${this.pad(currentMinutes)}`;

    const morningTime = localStorage.getItem('morningTime');
    const eveningTime = localStorage.getItem('eveningTime');

    if (formattedTime === morningTime || formattedTime === eveningTime) {
      this.showReminder();
    }
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  showReminder() {
    
    alert('Time to take your medication: '+localStorage.getItem('medicationName'));
  }
}