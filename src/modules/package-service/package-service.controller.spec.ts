import { Test, TestingModule } from '@nestjs/testing';
import { PackageServiceController } from './package-service.controller';
import { PackageServiceService } from './package-service.service';

describe('PackageServiceController', () => {
  let controller: PackageServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageServiceController],
      providers: [PackageServiceService],
    }).compile();

    controller = module.get<PackageServiceController>(PackageServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
