import { Test, TestingModule } from '@nestjs/testing';
import { TravelersController } from './travelers.controller';
import { TravelersService } from './travelers.service';

describe('TravelersController', () => {
  let controller: TravelersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelersController],
      providers: [TravelersService],
    }).compile();

    controller = module.get<TravelersController>(TravelersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
