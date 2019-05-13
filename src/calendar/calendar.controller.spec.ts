import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';

describe('Calendar Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CalendarController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CalendarController = module.get<CalendarController>(CalendarController);
    expect(controller).toBeDefined();
  });
});
