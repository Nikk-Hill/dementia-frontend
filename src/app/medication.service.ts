import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor() {}

  addMedication(name: string, morningTime: string, eveningTime: string) {
    const morningDate = new Date();
    const eveningDate = new Date();
    
    morningDate.setHours(parseInt(morningTime.split(':')[0]), parseInt(morningTime.split(':')[1]), 0);
    eveningDate.setHours(parseInt(eveningTime.split(':')[0]), parseInt(eveningTime.split(':')[1]), 0);

    this.scheduleReminder(morningDate, name);
    this.scheduleReminder(eveningDate, name);
  }

  private scheduleReminder(time: Date, medicationName: string) {
    const now = new Date();
    const delay = time.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        alert(`Time to take your medication: ${medicationName}`);
      }, delay);
    }
  }
}