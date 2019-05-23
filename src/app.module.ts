import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { RedisClient, createClient } from 'redis';

@Module({
  imports: [CalendarModule],
})
export class AppModule {}
