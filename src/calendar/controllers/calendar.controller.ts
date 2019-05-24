import { Controller, Get, Post, Param, Query, Body, HttpCode, Delete } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { Appointment } from '../interfaces/appointment.interface';

@Controller('calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) {}

    @Get(':userId')
    async getCalendarAppointment(@Param('userId') userId: string,
                                 @Query('month') month?: number,
                                 @Query('year') year?: number): Promise<Appointment[]> {
        const res = await this.calendarService.queryCalendarAppointments(userId, month, year);
        return res.map((appointment: string) => JSON.parse(appointment));
    }

    @Post(':userId')
    @HttpCode(204)
    postCalendarAppointment(@Param('userId') userId: string, @Body() appointment: Appointment) {
        this.calendarService.createCalendarAppointment(userId, appointment);
    }

    @Delete(':appointmentId')
    deleteAppointment(@Param() appointmentId: string) {
        // TODO
    }
}
