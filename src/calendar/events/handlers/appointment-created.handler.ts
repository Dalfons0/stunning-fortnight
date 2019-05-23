import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppointmentCreated } from '../impl/appointment-created.event';

@EventsHandler(AppointmentCreated)
export class AppointmentCreatedHandler implements IEventHandler<AppointmentCreated> {
    handle(event: AppointmentCreated) {
        console.log(`Appointment properly created by user ${event.userId}.`);
    }
}
