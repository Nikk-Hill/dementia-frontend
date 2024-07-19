import { TestBed } from '@angular/core/testing';

import { MedicineReminderSchedulerService } from './medicine-reminder-scheduler.service';

describe('MedicineReminderSchedulerService', () => {
  let service: MedicineReminderSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineReminderSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
