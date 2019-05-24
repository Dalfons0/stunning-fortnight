import { Injectable, Inject } from '@nestjs/common';
import { Appointment } from '../interfaces/appointment.interface';
import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '../commands/impl/create-appointment.command';

@Injectable()
export class CalendarService {
    private lrange: (key: string, start: number, stop: number) => Promise<string[]>;

    constructor(private commandBus: CommandBus, private client: RedisClient) {
        this.lrange = promisify(client.lrange).bind(client);
    }

    queryCalendarAppointments(user: string, queryMonth: number, queryYear: number): Promise<string[]> {
        const currentDate = new Date();
        const month = queryMonth || currentDate.getMonth();
        const year = queryYear || currentDate.getFullYear();
        const key = `${user}:${month}:${year}`;
        return this.lrange(key, 0, -1);
    }

    createCalendarAppointment(userId: string, appointment: Appointment) {
        this.commandBus.execute(
            new CreateAppointmentCommand(userId, appointment),
        );
    }
}
