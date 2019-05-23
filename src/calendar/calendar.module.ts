import { Module } from '@nestjs/common';
import { CalendarController } from './controllers/calendar.controller';
import { CalendarService } from './services/calendar.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { RedisClient, createClient } from 'redis';

const redisProvider = {
    provide: RedisClient,
    useFactory: createClient,
};

@Module({
    imports: [CqrsModule],
    controllers: [CalendarController],
    providers: [
        CalendarService,
        ...CommandHandlers,
        ...EventHandlers,
        redisProvider,
    ],
})
export class CalendarModule {}
