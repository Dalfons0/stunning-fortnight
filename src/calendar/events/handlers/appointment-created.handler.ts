import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppointmentCreated } from '../impl/appointment-created.event';
import { RedisClient } from 'redis';
import { Logger } from '@nestjs/common';

@EventsHandler(AppointmentCreated)
export class AppointmentCreatedHandler implements IEventHandler<AppointmentCreated> {

    constructor(private client: RedisClient) {}

    handle({ userId, appointment }: AppointmentCreated) {
        Logger.debug(`Appointment properly created by user ${userId}.`);
        const startDate = new Date(appointment.startDate);
        const key = `${userId}:${startDate.getMonth()}:${startDate.getFullYear()}`;
        this.client.rpush(key, JSON.stringify(appointment));
    }
}
