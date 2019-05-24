import { AppointmentCreatedHandler } from './appointment-created.handler';
import { createClient } from 'redis';

describe('AppointmentCreated', () => {
  it('should be defined', () => {
    expect(new AppointmentCreatedHandler(createClient())).toBeTruthy();
  });
});
