import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '../impl/create-appointment.command';

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentHandler implements ICommandHandler<CreateAppointmentCommand> {

    async execute({ userId, appointment }: CreateAppointmentCommand): Promise<void> {
        console.log(`Appoiment created by user ${userId} from ${appointment.startDate} to ${appointment.endDate}`);
    }
}
