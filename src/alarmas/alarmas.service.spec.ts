import { Test, TestingModule } from '@nestjs/testing';
import { AlarmasService } from './alarmas.service';

describe('AlarmasService', () => {
  let service: AlarmasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmasService],
    }).compile();

    service = module.get<AlarmasService>(AlarmasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
