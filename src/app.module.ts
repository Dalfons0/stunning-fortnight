import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from './calendar/calendar.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CalendarModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
