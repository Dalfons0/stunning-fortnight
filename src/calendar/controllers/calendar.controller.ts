import { Controller, Get, Post, Param, Query, Body, HttpCode } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';

@Controller('calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) {}

    @Get(':userId')
    async getCalendarStates(@Param('userId') userId: string, @Query('month') month?: number, @Query('year') year?: number): Promise<any[]> {
        const res = await this.calendarService.getCalendarStates(userId, month, year);
        return res.map((state: string) => JSON.parse(state));
    }

    @Post(':userId')
    @HttpCode(204)
    postCalendarState(@Param('userId') userId: string, @Body() state: any) {
        this.calendarService.crateCalendarState(userId, state);
    }
}
