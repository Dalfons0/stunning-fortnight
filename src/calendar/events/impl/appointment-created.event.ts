import { Appointment } from '../../interfaces/appointment.interface';
import { IEvent } from '@nestjs/cqrs';

export class AppointmentCreated implements IEvent {
    constructor(
        public readonly userId: string,
        public readonly appointment: Appointment,
    ) { }
}
