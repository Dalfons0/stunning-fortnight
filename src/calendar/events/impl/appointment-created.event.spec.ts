import { AppointmentCreated } from './appointment-created.event';

describe('AppointmentCreated', () => {
  it('should be defined', () => {
    expect(new AppointmentCreated('0000', { name: 'name', startDate: 'startDate', endDate: 'endDate' })).toBeTruthy();
  });
});
