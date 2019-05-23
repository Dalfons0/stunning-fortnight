import { ICommand } from '@nestjs/cqrs';
import { Appointment } from '../../interfaces/appointment.interface';

export class CreateAppointmentCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly appointment: Appointment,
    ) {}
}
