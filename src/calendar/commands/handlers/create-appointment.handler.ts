import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '../impl/create-appointment.command';
import { AppointmentCreated } from '../../events/impl/appointment-created.event';

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentHandler implements ICommandHandler<CreateAppointmentCommand> {

    constructor(private eventBus: EventBus) {}

    async execute({ userId, appointment }: CreateAppointmentCommand): Promise<void> {
        console.log(`Appoiment created by user ${userId} from ${appointment.startDate} to ${appointment.endDate}`);
        this.eventBus.publish(new AppointmentCreated(userId, appointment));
    }
}
