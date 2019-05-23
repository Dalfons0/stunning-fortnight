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

    getCalendarStates(user: string, queryMonth: number, queryYear: number): Promise<string[]> {
        const currentDate = new Date();
        const month = queryMonth || currentDate.getMonth();
        const year = queryYear || currentDate.getFullYear();
        const key = `${user}:${month}:${year}`;
        return this.lrange(key, 0, -1);
    }

    async crateCalendarState(user: string, state: any): Promise<void> {
        const startDate = new Date(state.startDate);
        const key = `${user}:${startDate.getMonth()}:${startDate.getFullYear()}`;
        this.client.rpush(key,  JSON.stringify(state));
    }

    async createAppointment(userId: string, appointment: Appointment) {
        this.commandBus.execute(
            new CreateAppointmentCommand(userId, appointment),
        );
    }
}
