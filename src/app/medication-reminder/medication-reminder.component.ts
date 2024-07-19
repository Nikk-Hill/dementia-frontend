import { Component, EventEmitter, Output } from '@angular/core';
import { SchedulerService } from '../medicine-reminder-scheduler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; 
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medication-reminder',
  standalone: true,
  templateUrl: './medication-reminder.component.html',
  styleUrls: ['./medication-reminder.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class MedicationReminderComponent{
  @Output() close = new EventEmitter<void>();

  medicationName: string = '';
  morningTime: string = '';
  eveningTime: string = '';

  constructor(private schedulerService: SchedulerService) {}

  onSubmit() {
    localStorage.setItem('medicationName', this.medicationName);
    localStorage.setItem('morningTime', this.morningTime);
    localStorage.setItem('eveningTime', this.eveningTime);
    this.schedulerService.startScheduler();
    alert('Medication times saved and scheduler started!');
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
