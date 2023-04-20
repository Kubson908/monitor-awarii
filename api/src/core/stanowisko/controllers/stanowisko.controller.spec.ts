import { Test, TestingModule } from '@nestjs/testing';
import { StanowiskoController } from './stanowisko.controller';

describe('StanowiskoController', () => {
  let controller: StanowiskoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StanowiskoController],
    }).compile();

    controller = module.get<StanowiskoController>(StanowiskoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
