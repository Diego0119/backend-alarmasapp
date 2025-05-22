import { Test, TestingModule } from '@nestjs/testing';
import { AlarmasController } from './alarmas.controller';

describe('AlarmasController', () => {
  let controller: AlarmasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmasController],
    }).compile();

    controller = module.get<AlarmasController>(AlarmasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
