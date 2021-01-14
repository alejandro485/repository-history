import { Test, TestingModule } from '@nestjs/testing';
import { GetBranchesService } from './get-branches.service';

describe('GetBranchesService', () => {
  let service: GetBranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBranchesService],
    }).compile();

    service = module.get<GetBranchesService>(GetBranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
