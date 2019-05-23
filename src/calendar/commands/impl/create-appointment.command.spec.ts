import { CreateAppointmentCommand } from './create-appointment.command';

describe('CreateAppointment', () => {
  it('should be defined', () => {
    expect(new CreateAppointmentCommand('0000', { name: 'name', startDate: 'startDate', endDate: 'endDate'})).toBeTruthy();
  });
});
