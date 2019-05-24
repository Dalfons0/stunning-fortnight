import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppointmentCreated } from '../impl/appointment-created.event';
import { RedisClient } from 'redis';

@EventsHandler(AppointmentCreated)
export class AppointmentCreatedHandler implements IEventHandler<AppointmentCreated> {

    constructor(private client: RedisClient) {}

    handle({ userId, appointment }: AppointmentCreated) {
        console.log(`Appointment properly created by user ${userId}.`);
        const startDate = new Date(appointment.startDate);
        const key = `${userId}:${startDate.getMonth()}:${startDate.getFullYear()}`;
        this.client.rpush(key, JSON.stringify(appointment));
    }
}
