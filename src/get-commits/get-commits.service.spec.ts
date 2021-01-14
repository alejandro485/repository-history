import { Test, TestingModule } from '@nestjs/testing';
import { GetCommitsService } from './get-commits.service';

describe('GetCommitsService', () => {
  let service: GetCommitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCommitsService],
    }).compile();

    service = module.get<GetCommitsService>(GetCommitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
