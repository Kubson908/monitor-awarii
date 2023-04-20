import { Test, TestingModule } from '@nestjs/testing';
import { StanowiskoService } from './stanowisko.service';

describe('StanowiskoService', () => {
  let service: StanowiskoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StanowiskoService],
    }).compile();

    service = module.get<StanowiskoService>(StanowiskoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
