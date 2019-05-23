import { AppointmentCreated } from './appointment-created.event';

describe('AppointmentCreated', () => {
  it('should be defined', () => {
    expect(new AppointmentCreated()).toBeTruthy();
  });
});
